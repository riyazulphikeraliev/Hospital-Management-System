import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminServiceMgmtComponent } from './container/admin-service-mgmt/admin-service-mgmt.component';
import { AdminUserMgmtComponent } from './container/admin-user-mgmt/admin-user-mgmt.component';
import { AddAdminComponent } from './container/add-admin/add-admin.component';
import { GetAdminComponent } from './container/get-admin/get-admin.component';
import { UpdateAdminComponent } from './container/update-admin/update-admin.component';
import { SharedFeatureModule } from '../../shared/shared-feature.module';
import { AdminDetailComponent } from './container/admin-detail/admin-detail.component';



@NgModule({
  declarations: [
    AdminUserMgmtComponent,
    AdminServiceMgmtComponent,
    AddAdminComponent,
    GetAdminComponent,
    UpdateAdminComponent,
    AdminDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedFeatureModule
   
  ]
})
export class AdminModule { }
