import { Component } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ComponentBase {

  constructor() {
    super();
  }

  /* Public Methods */
  initVariables(): void { }

  subscribeEvents(): void { }

  load(): void { }

  unload(): void { }
}
