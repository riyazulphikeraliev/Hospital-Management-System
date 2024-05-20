import { NgModule } from '@angular/core';
import { PatientsRoutingModule } from './patients-routing.module';
import { AddPatientComponent } from './container/add-patient/add-patient.component';
import { UpdatePatientComponent } from './container/update-patient/update-patient.component';
import { GetPatientsComponent } from './container/get-patients/get-patients.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailComponent } from './container/patient-detail/patient-detail.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AddPatientComponent,
    UpdatePatientComponent,
    GetPatientsComponent,
    PatientDetailComponent,
  ],
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
  ],
})
export class PatientsModule {}
