import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './container/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './container/update-doctor/update-doctor.component';


const routes: Routes = [
  { path: 'add-doc', component: AddDoctorComponent},
{ path:'update-doc/:id',component:UpdateDoctorComponent}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
