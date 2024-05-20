import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientBillRoutingModule } from './patient-bill-routing.module';
import { GetPatientBillComponent } from './container/get-patient-bill/get-patient-bill.component';
import { AddPatientBillComponent } from './container/add-patient-bill/add-patient-bill.component';
import { UpdatePatientBillComponent } from './container/update-patient-bill/update-patient-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetPatientBillComponent,
    AddPatientBillComponent,
    UpdatePatientBillComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PatientBillRoutingModule
  ]
})
export class PatientBillModule { }
