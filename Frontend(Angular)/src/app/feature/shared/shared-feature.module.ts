import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { GetDoctorsComponent } from './components/get-doctors/get-doctors.component';
import { GetSpecializationsComponent } from './components/get-specializations/get-specializations.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { DoctorScrollingCardSliderComponent } from './components/doctor-scrolling-card-slider/doctor-scrolling-card-slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewDoctorComponent } from './components/view-doctor/view-doctor.component';
import { SpecDocComponent } from './components/spec-doc/spec-doc.component';
import { DoctorScheduleComponent } from './components/view-doctor/doctor-schedule/doctor-schedule.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { YouAreUnauthourizedComponent } from './components/you-are-unauthourized/you-are-unauthourized.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    SharedComponent,
    GetDoctorsComponent,
    GetSpecializationsComponent,
    NavBarComponent,
    CarouselComponent,
    BookAppointmentComponent,
    DoctorScrollingCardSliderComponent,
    FooterComponent,
    ViewDoctorComponent,
    SpecDocComponent,
    DoctorScheduleComponent,
    PageNotFoundComponent,
    YouAreUnauthourizedComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule, 
    SharedRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    GetDoctorsComponent,
    GetSpecializationsComponent,
    NavBarComponent,
    CarouselComponent,
    BookAppointmentComponent,
    DoctorScrollingCardSliderComponent,
    FooterComponent,
    ViewDoctorComponent,
    SpecDocComponent,
    DoctorScheduleComponent,
    PageNotFoundComponent,
    ConfirmationModalComponent]
})
export class SharedFeatureModule {}
