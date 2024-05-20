import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetMedicalRecordComponent } from './container/get-medical-record/get-medical-record.component';
import { AddMedicalRecordComponent } from './container/add-medical-record/add-medical-record.component';
import { UpadateMedicalRecordComponent } from './container/upadate-medical-record/upadate-medical-record.component';

const routes: Routes = [
  {path:'get-MR',component:GetMedicalRecordComponent},
  {path:'add-MR',component:AddMedicalRecordComponent},
  {path:'update-MR/:id',component:UpadateMedicalRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRecordRoutingModule { }
