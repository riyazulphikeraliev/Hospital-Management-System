import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDoctorComponent } from './container/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './container/update-doctor/update-doctor.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AddDoctorComponent,
    UpdateDoctorComponent,  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule, 
    ReactiveFormsModule,
   
],
})
export class DoctorsModule {}
