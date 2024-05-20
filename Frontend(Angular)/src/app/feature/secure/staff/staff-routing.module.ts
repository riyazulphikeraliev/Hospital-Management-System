import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStaffComponent } from './container/get-staff/get-staff.component';
import { AddStaffComponent } from './container/add-staff/add-staff.component';
import { UpdateStaffComponent } from './container/update-staff/update-staff.component';

const routes: Routes = [
  {
    path:'get-staff',component:GetStaffComponent
  },
  {
    path:'add-staff',component:AddStaffComponent
  },
  {
    path:'update-staff/:id',component:UpdateStaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
