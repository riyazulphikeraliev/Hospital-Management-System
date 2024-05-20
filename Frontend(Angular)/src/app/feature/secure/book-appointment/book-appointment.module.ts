import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { GetAppointmentComponent } from './container/get-appointment/get-appointment.component';
import { UpdateAppointmentComponent } from './container/update-appointment/update-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
 import { TableModule } from 'primeng/table';
 import { ButtonModule } from 'primeng/button';
// import { TooltipModule } from 'primeng/tooltip';
// import {AccordionModule} from 'primeng/accordion';     
// import {MenuItem} from 'primeng/api'; 


@NgModule({
  declarations: [
    GetAppointmentComponent,
    UpdateAppointmentComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BookAppointmentRoutingModule,
    TableModule,
    
 
  ]
})
export class BookAppointmentModule { }
