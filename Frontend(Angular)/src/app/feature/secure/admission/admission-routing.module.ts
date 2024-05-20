import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAdmissionComponent } from './container/get-admission/get-admission.component';
import { AddAdmissionComponent } from './container/add-admission/add-admission.component';
import { UpdateAdmissionComponent } from './container/update-admission/update-admission.component';

const routes: Routes = [
  {path:'get-admission',component:GetAdmissionComponent},
  {path:'add-admission',component:AddAdmissionComponent},
  {path:'update-admission/:id',component:UpdateAdmissionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
