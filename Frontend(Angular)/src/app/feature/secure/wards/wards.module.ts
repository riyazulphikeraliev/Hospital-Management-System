import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardsRoutingModule } from './wards-routing.module';
import { GetWardsComponent } from './container/get-wards/get-wards.component';
import { AddWardComponent } from './container/add-ward/add-ward.component';
import { UpdateWardComponent } from './container/update-ward/update-ward.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetWardsComponent,
    AddWardComponent,
    UpdateWardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    WardsRoutingModule
  ]
})
export class WardsModule { }
