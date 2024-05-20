import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ComponentBase } from '@shared/abstracts/component-base';
import { ProfileService } from '../../services';
import { Router } from '@angular/router';
import { Appointment, Doctor, MedicalRecord, Patient } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGrid plugin
import { CalendarOptions, DateSelectArg, EventInput } from '@fullcalendar/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends ComponentBase {
  calendarEvents: EventInput[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin], 
    weekends: true,
    events: this.calendarEvents 
  };

 handleDateClick(event: any) {
    const clickedDate = event.dateStr; 
    console.log('Clicked on date:', clickedDate);
   
  }
  calendarPlugins = [dayGridPlugin];
  
  displayedColumns: string[] = ['date', 'time', 'patient', 'status'];

  MasterId!: any;
  userId!: any;
  userRole!: any;
  admin!: any;
  doctor!: any;
  patient!: any;
  UserName!: string;
  upcomingAppointments!: any;
  medicalRecords!: any;
  bills!:any;
  showChangePasswordModal: boolean = false;
 
  openChangePasswordModal(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '400px',
      data: { username: this.UserName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
    this.userRole = this.authService.getLocalStorageDetails().roleName;
    this.userId = this.authService.getLocalStorageDetails().userId;
  }

  /* Public Methods */
  override initVariables(): void {
    if (this.userRole === 'Admin') {
      // Fetch admin details
      this.profileService.getAdminByUserId(this.userId).subscribe((data) => {
        this.admin = data[0];
        this.UserName = data[0].userName;
        this.MasterId = data[0].id;
      });
    } else if (this.userRole === 'Doctor') {
      this.profileService.getDoctorByUserId(this.userId).subscribe((data) => {
        this.doctor = data[0];
        this.UserName = data[0].userName;
        this.MasterId = data[0].id;
        this.profileService.GetAppointmentsByDoctorId(this.MasterId).subscribe((appointments: Appointment[]) => {
          const currentDate = new Date();
          this.calendarEvents=appointments.map(appointment=>({
            title: `Appointment with Dr. ${appointment.doctorFullName} (${appointment.specializationName})`,
          start: appointment.appointmentDate + 'T' + appointment.appointmentTime,
          end: appointment.appointmentDate + 'T' + appointment.appointmentTime,
          color: 'green',
          }))
          console.log("helloo calender evnets",this.calendarEvents)

         // this.upcomingAppointments = appointments
          this.upcomingAppointments = appointments.filter((appointment) => {
            const appointmentDate = new Date(appointment.appointmentDate);
            return appointmentDate > currentDate;
          });
        });
        this.profileService.getMRbyDocId(this.MasterId).subscribe((data)=>{
          this.medicalRecords = data;
        })
      
      });
    } else if (this.userRole === 'Patient') {
      this.profileService.getPatientByUserId(this.userId).subscribe((data) => {
        this.patient = data[0];
        this.UserName = data[0].userName;
        this.MasterId = data[0].id;
  
     
  
        this.profileService.GetAppointmentsByPatientId(this.MasterId).subscribe((appointments: Appointment[]) => {
          const currentDate = new Date();
          this.upcomingAppointments = appointments.filter((appointment) => {
            const appointmentDate = new Date(appointment.appointmentDate);
            return appointmentDate > currentDate;
          });
        });

        this.profileService.GetMRBypatientId(this.MasterId).subscribe((records:MedicalRecord[])=>{
          //this.medicalRecords = records.filter(record=> this.isRecentRecord(record.date));
          this.medicalRecords = records;
        })

        this.profileService.GetBillByPatienId(this.MasterId).subscribe((bills)=>{
          this.bills=bills
        })
      });
    } else {
      return;
    }
  }

  ToAddMR(){
    this.router.navigate(['secure/profile/add-MR']);
  }
 

  subscribeEvents(): void {
  
  }
  isRecentRecord(recordDate: Date): boolean {
    const currentDate = new Date();
    return recordDate >= currentDate; 
  }

  load(): void {}

  unload(): void {}

  editAdmin(): void {
    this.router.navigate(['secure/profile/updateAdmin']);

  }
  editDoctor(): void {
    this.router.navigate(['secure/profile/updateDoctor']);
  }
  editPatient(): void {
    this.router.navigate(['secure/profile/updatePatient']);
  }









  
}
