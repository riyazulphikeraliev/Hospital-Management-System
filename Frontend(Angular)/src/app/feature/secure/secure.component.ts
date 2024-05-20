import { Component } from '@angular/core';
import { AppConfig } from '@core/configs/app.config';
import { AuthService } from '@core/services/auth.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent extends ComponentBase {

  constructor(
    private idle: Idle,
    private authService: AuthService,
    private modalService: ModalService
  ) {
    super();
    //this.watchIdleActivity();
  }

  /* Public Methods */
  initVariables(): void { }

  subscribeEvents(): void { }

  load(): void {
    this.reset();
  }

  unload(): void { }

  /* Private Methods */
  private watchIdleActivity(): void {
    this.idle.setIdle(1); // how long can they be inactive before considered idle, in seconds
    this.idle.setTimeout(60 * AppConfig.auth.idleTimeoutInMinutes); // how long can they be idle before considered timed out, in seconds
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active
    this.idle.onTimeout.subscribe(() => {
      this.modalService.showMessage('Time Out')
        .subscribe(() => {
          this.authService.logout();
        });
    });
  }

  private reset(): void {
    this.idle.watch();
  }
}