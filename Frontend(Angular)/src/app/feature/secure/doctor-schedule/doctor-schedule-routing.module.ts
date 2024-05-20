import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetDoctorScheduleComponent } from './container/get-doctor-schedule/get-doctor-schedule.component';

const routes: Routes = [
  
  {
    path:'get-schedule',component:GetDoctorScheduleComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorScheduleRoutingModule { }
