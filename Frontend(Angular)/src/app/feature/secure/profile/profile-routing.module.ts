import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './containers/profile/profile.component';
import { UpdateAdminComponent } from '../admin/container/update-admin/update-admin.component';
import { UpdateDoctorComponent } from '../doctors/container/update-doctor/update-doctor.component';
import { UpdatePatientComponent } from '../patients/container/update-patient/update-patient.component';
import { ChangePasswordModalComponent } from './containers/change-password-modal/change-password-modal.component';
import { GetDoctorScheduleComponent } from '../doctor-schedule/container/get-doctor-schedule/get-doctor-schedule.component';
import { AddMedicalRecordComponent } from '../medical-record/container/add-medical-record/add-medical-record.component';
import { PieChartForReportComponent } from './containers/pie-chart-for-report/pie-chart-for-report.component';
import { WardCharReportComponent } from './containers/ward-char-report/ward-char-report.component';

const routes: Routes = [{ path: '', component: ProfileComponent },
  {path:'updateAdmin',component:UpdateAdminComponent},
  {path:'updateDoctor',component:UpdateDoctorComponent},
  {path:'updatePatient',component:UpdatePatientComponent},
  { path: 'change', component:ChangePasswordModalComponent},
  {path:'ds',component:GetDoctorScheduleComponent},
  {path:'add-MR',component:AddMedicalRecordComponent},
  {path:'chart',component:WardCharReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
