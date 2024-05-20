import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPatientBillComponent } from './container/get-patient-bill/get-patient-bill.component';
import { AddPatientBillComponent } from './container/add-patient-bill/add-patient-bill.component';
import { UpdatePatientBillComponent } from './container/update-patient-bill/update-patient-bill.component';

const routes: Routes = [
  {path:'get-PB',component:GetPatientBillComponent},
  {path:'add-PB',component:AddPatientBillComponent},
  {path:'update-PB/:id',component:UpdatePatientBillComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientBillRoutingModule { }
