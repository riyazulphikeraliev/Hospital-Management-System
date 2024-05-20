import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorScheduleRoutingModule } from './doctor-schedule-routing.module';
import { SharedFeatureModule } from '../../shared/shared-feature.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    PipesModule,
    SharedFeatureModule,
    CommonModule,
    DoctorScheduleRoutingModule
  ],
  exports: [

  ]
})
export class DoctorScheduleModule { }
