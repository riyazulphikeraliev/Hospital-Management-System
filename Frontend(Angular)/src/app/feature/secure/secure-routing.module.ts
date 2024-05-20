import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';
import { AuthorizationGuard } from '@core/guards/authorization.guard';
import { AuthenticationGuard } from '@core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      // {
      //   path: 'dev-guide',
      //   loadChildren: () =>
      //     import('./dev-guide/dev-guide.module').then((m) => m.DevGuideModule),
      // },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
        canActivateChild: [AuthorizationGuard,AuthenticationGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivateChild: [AuthorizationGuard,AuthenticationGuard],
      },
      {
        path: 'patients',
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
        canActivateChild: [AuthorizationGuard,AuthenticationGuard],
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
        canActivateChild: [AuthorizationGuard],
      },
      {
        path: 'admission',
        loadChildren: () =>
          import('./admission/admission.module').then((m) => m.AdmissionModule),
        canActivateChild: [AuthorizationGuard],
      },
      {
        path: 'patientBill',
        loadChildren: () =>
          import('./patient-bill/patient-bill.module').then(
            (m) => m.PatientBillModule
          ),
        canActivateChild: [AuthorizationGuard],
      },
      {
        path: 'MedicalRecord',
        loadChildren: () =>
          import('./medical-record/medical-record.module').then(
            (m) => m.MedicalRecordModule
          ),
        canActivateChild: [AuthorizationGuard],
      },
      {
        path: 'Ward',
        loadChildren: () =>
          import('./wards/wards.module').then((m) => m.WardsModule),
        canActivateChild: [AuthorizationGuard],
      },

      {
        path: 'Specialization',
        loadChildren: () =>
          import('./specialization/specialization.module').then(
            (m) => m.SpecializationModule
          ),
        canActivateChild: [AuthorizationGuard],
      },
      {
        path: 'DoctorSchedule',
        loadChildren: () =>
          import('./doctor-schedule/doctor-schedule.module').then(
            (m) => m.DoctorScheduleModule
          ),
        canActivateChild: [AuthorizationGuard],
      },
      {
        path: 'BookAppointment',
        loadChildren: () =>
          import('./book-appointment/book-appointment.module').then(
            (m) => m.BookAppointmentModule
          ),
        canActivateChild: [AuthorizationGuard],
      },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
