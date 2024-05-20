import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './container/add-patient/add-patient.component';
import { GetPatientsComponent } from './container/get-patients/get-patients.component';
import { PatientDetailComponent } from './container/patient-detail/patient-detail.component';
import { UpdatePatientComponent } from './container/update-patient/update-patient.component';

const routes: Routes = [
  { path: 'get-patient', component: GetPatientsComponent },
  { path: 'patientdetail/:id', component: PatientDetailComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'edit-patient/:id', component: UpdatePatientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
