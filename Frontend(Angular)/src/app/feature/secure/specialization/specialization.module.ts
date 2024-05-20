import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecializationRoutingModule } from './specialization-routing.module';
import { UpdateSpecializationComponent } from './container/update-specialization/update-specialization.component';
import { GetSpecializationComponent } from './container/get-specialization/get-specialization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateSpecializationComponent,
    GetSpecializationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SpecializationRoutingModule
  ]
})
export class SpecializationModule { }
