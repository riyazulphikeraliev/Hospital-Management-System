
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMatModalModule } from '@vslabs/ngx-mat-modal';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { ModulesModule } from './modules/modules.module';
import { PipesModule } from './pipes/pipes.module';
import { ModalService } from './services/modal.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const exportable = [
  ComponentsModule,
  DirectivesModule,
  ModulesModule,
  PipesModule,
  PerfectScrollbarModule,
  NgxMatModalModule
];

@NgModule({
  imports: exportable,
  exports: exportable,
  providers: [DatePipe, ModalService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }]
})
export class SharedModule { }
