import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAppointmentComponent } from './container/get-appointment/get-appointment.component';
import { UpdateAppointmentComponent } from './container/update-appointment/update-appointment.component';

const routes: Routes = [

  {
    path:'get-appointment',component:GetAppointmentComponent
  },
  {
    path:'update-appointment/:id',component:UpdateAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookAppointmentRoutingModule { }
