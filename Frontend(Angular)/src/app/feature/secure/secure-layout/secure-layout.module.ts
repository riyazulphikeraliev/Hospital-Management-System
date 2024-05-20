import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { SharedFeatureModule } from '../../shared/shared-feature.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppLayoutComponent,
  ],
  imports: [
     DashboardModule,
    SharedModule,
    RouterModule,
    SharedFeatureModule
  ],
  exports: [
    AppLayoutComponent,
  ]
})
export class SecureLayoutModule { }
