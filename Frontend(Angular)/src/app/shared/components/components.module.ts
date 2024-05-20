import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../modules/material.module';
import { NoRecordsMessageComponent } from './no-records-message/no-records-message.component';
import { SkeletonAccordianComponent } from './skeleton-accordian/skeleton-accordian.component';
import { SkeletonListComponent } from './skeleton-list/skeleton-list.component';
import { SkeletonTableComponent } from './skeleton-table/skeleton-table.component';
import { TimerComponent } from './timer/timer.component';
import { ValidationSheetComponent } from './validation-sheet/validation-sheet.component';

const exportable = [
  NoRecordsMessageComponent,
  ValidationSheetComponent,
  SkeletonAccordianComponent,
  SkeletonListComponent,
  SkeletonTableComponent,
  TimerComponent
];

@NgModule({
  declarations: exportable,
  imports: [
    CommonModule,
    MaterialModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  exports: exportable,
})
export class ComponentsModule { }
