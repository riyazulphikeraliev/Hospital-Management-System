import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserMgmtComponent } from './container/admin-user-mgmt/admin-user-mgmt.component';
import { AdminServiceMgmtComponent } from './container/admin-service-mgmt/admin-service-mgmt.component';
import { AddAdminComponent } from './container/add-admin/add-admin.component';
import { GetAdminComponent } from './container/get-admin/get-admin.component';
import { UpdateAdminComponent } from './container/update-admin/update-admin.component';
import { AdminDetailComponent } from './container/admin-detail/admin-detail.component';

const routes: Routes = [
  {
  path:'admin-usermgmt', component:AdminUserMgmtComponent
},
{
  path:'admin-servicemgmt',component:AdminServiceMgmtComponent
},
{
  path:'add-admin',component:AddAdminComponent
},
{
  path:'get-admin',component:GetAdminComponent
},
{
  path:'view-admin/:id',component:AdminDetailComponent
},
{
  path:'update-admin/:id',component:UpdateAdminComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
