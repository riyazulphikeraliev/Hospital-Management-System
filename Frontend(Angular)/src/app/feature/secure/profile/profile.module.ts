import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SecureSharedModule } from '../secure-shared/secure-shared.module';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AdminModule } from '../admin/admin.module';
import { PatientsModule } from '../patients/patients.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { ChangePasswordModalComponent } from './containers/change-password-modal/change-password-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';
import { GetDoctorScheduleComponent } from '../doctor-schedule/container/get-doctor-schedule/get-doctor-schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PieChartForReportComponent } from './containers/pie-chart-for-report/pie-chart-for-report.component';
import { WardCharReportComponent } from './containers/ward-char-report/ward-char-report.component';




@NgModule({
  declarations: [
    ProfileComponent,
    GetDoctorScheduleComponent,
    ChangePasswordModalComponent,
    PieChartForReportComponent,
    WardCharReportComponent,
    
  ],
  imports: [
    FullCalendarModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    ProfileRoutingModule,
    SecureSharedModule,
    AdminModule,
    PatientsModule,
    DoctorsModule,
  ],
})
export class ProfileModule {}
