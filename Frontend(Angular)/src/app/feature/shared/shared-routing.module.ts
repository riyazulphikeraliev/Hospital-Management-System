import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { GetDoctorsComponent } from './components/get-doctors/get-doctors.component';
import { GetSpecializationsComponent } from './components/get-specializations/get-specializations.component';
import { SharedComponent } from './shared.component';

import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { ViewDoctorComponent } from './components/view-doctor/view-doctor.component';
import { SpecDocComponent } from './components/spec-doc/spec-doc.component';
import { DoctorScheduleComponent } from './components/view-doctor/doctor-schedule/doctor-schedule.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { YouAreUnauthourizedComponent } from './components/you-are-unauthourized/you-are-unauthourized.component';

const routes: Routes = [
  {
  path:'',
  component:SharedComponent,
  children:[
  {
    path: 'getdoc',
    component:GetDoctorsComponent
  },
  {
    path:'getspec',
    component:GetSpecializationsComponent
  },
  {
    path:'specdoc/:id',
    component:SpecDocComponent
  },
  {
    path:'carousel',
    component:CarouselComponent
  },
  {
    path:'viewdoc/:id',
    component:ViewDoctorComponent ,children: [
      { path: 'schedule', component: DoctorScheduleComponent }]
  },
  {
    path:'bookappointment',
    component:BookAppointmentComponent
  },
  { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'Unauth',component:YouAreUnauthourizedComponent
  }

]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
