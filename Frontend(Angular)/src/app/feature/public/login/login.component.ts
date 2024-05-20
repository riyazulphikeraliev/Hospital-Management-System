import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@shared/abstracts/component-base';
import { FormBase } from '@shared/contracts';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ComponentBase implements FormBase {

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
  ) {
    super();
  }

  /* Public Methods */
  initVariables(): void { }

  subscribeEvents(): void { }

  load(): void {
    this.buildForm();
  }

  unload(): void { }

  buildForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  bindForm(): void { }

  resetForm(): void {
    this.loginForm.reset();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
    }
  }
}