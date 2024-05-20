import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '@shared/abstracts/component-base';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends ComponentBase {
  
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private registerService:RegisterService) {super()
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      contactNumber: ['',Validators.required],
      email: ['',Validators.required],
      address: ['',Validators.required],
      imagePath:[''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
   }
   register() {
   
    if (this.registerForm.valid) {
     this.registerService.register(this.registerForm.value)
    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  override initVariables(): void {
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
}