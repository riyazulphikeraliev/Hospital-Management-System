import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { AddStaffComponent } from './container/add-staff/add-staff.component';
import { GetStaffComponent } from './container/get-staff/get-staff.component';
import { UpdateStaffComponent } from './container/update-staff/update-staff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddStaffComponent,
    GetStaffComponent,
    UpdateStaffComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
