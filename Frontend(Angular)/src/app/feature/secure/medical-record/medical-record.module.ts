import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRecordRoutingModule } from './medical-record-routing.module';
import { GetMedicalRecordComponent } from './container/get-medical-record/get-medical-record.component';
import { AddMedicalRecordComponent } from './container/add-medical-record/add-medical-record.component';
import { UpadateMedicalRecordComponent } from './container/upadate-medical-record/upadate-medical-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetMedicalRecordComponent,
    AddMedicalRecordComponent,
    UpadateMedicalRecordComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MedicalRecordRoutingModule
  ]
})
export class MedicalRecordModule { }
