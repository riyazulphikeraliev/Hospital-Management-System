import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { GetAdmissionComponent } from './container/get-admission/get-admission.component';
import { UpdateAdmissionComponent } from './container/update-admission/update-admission.component';
import { AddAdmissionComponent } from './container/add-admission/add-admission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetAdmissionComponent,
    UpdateAdmissionComponent,
    AddAdmissionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdmissionRoutingModule
  ]
})
export class AdmissionModule { }
