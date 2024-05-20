import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateSpecializationComponent } from './container/update-specialization/update-specialization.component';
import { GetSpecializationComponent } from './container/get-specialization/get-specialization.component';

const routes: Routes = [
  {path:'get-spec',component:GetSpecializationComponent},
  {path:'update-spec/:id',component:UpdateSpecializationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecializationRoutingModule { }
