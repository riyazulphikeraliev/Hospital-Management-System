import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetWardsComponent } from './container/get-wards/get-wards.component';
import { AddWardComponent } from './container/add-ward/add-ward.component';
import { UpdateWardComponent } from './container/update-ward/update-ward.component';

const routes: Routes = [
  {path:'get-ward',component:GetWardsComponent},
  {path:'add-ward',component:AddWardComponent},
  {path:'update-ward/:id',component:UpdateWardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardsRoutingModule { }
