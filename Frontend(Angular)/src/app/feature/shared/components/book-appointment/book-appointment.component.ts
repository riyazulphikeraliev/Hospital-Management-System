import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';
import { AuthService } from '@core/services/auth.service';
import { AppConfig } from '@core/configs';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent extends ComponentBase {
  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  dynamicContainer!: ViewContainerRef;

  appointmentForm!: FormGroup;
  minAppointmentDateTime!: string;
  doctors!: any[];
  patients!: any[];
  specializations!: any[];
  doctorschedule!: any[];
  ds!: any[];
  docId!: number;
  showLoginWarning: boolean = false;
  RoleName!: string;
  UserId!: number;
  showDynamicContainer = false;

  constructor(
    private formBuilder: FormBuilder,
    private getlistService: GetListService,
    private authService: AuthService,
    private resolver: ComponentFactoryResolver
  ) {
    super();
  }

  isLoggedOut(): boolean {
    const token = localStorage.getItem(AppConfig.auth.token);

    return !token;
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

clear(){
  this.appointmentForm.reset()
  location.reload()
}

  getRoleName(): string {
    if (this.isLoggedIn()) {
      this.RoleName = this.authService.getLocalStorageDetails().roleName;
    }
    return this.RoleName;
  }

  getUserId(): number {
    if (this.isLoggedIn()) {
      this.UserId = this.authService.getLocalStorageDetails().userId;
    }
    return this.UserId;
  }


  override initVariables(): void {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      specializationId: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointmentDateTime: ['', Validators.required],
      status: ['Scheduled'],
    });

    const currentDate = new Date();
    this.minAppointmentDateTime = this.formatDateTime(currentDate);
  }
  override subscribeEvents(): void {
    this.getlistService.getDoctor().subscribe((data) => {
      this.doctors = data;
    });

    this.getlistService.getSpecialization().subscribe((data) => {
      this.specializations = data;
    });
  }
  selectPatients() {
    if (this.isLoggedIn() && this.getRoleName() === 'Admin') {
      this.getlistService.getpatient().subscribe((data) => {
        this.patients = data;
      });
    } else if (this.isLoggedIn() && this.getRoleName() === 'Patient') {
      if (this.getUserId()) {
        this.getlistService
          .getPatientByUserId(this.getUserId())
          .subscribe((data) => {
            this.patients = data;
          });
      }
    }
  }
  override load(): void {}
  override unload(): void {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.selectPatients();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      function formatTime(date: Date): string {
        const hours = padNumber(date.getHours());
        const minutes = padNumber(date.getMinutes());
        return `${hours}:${minutes}`;
      }

      function padNumber(num: number): string {
        return num.toString().padStart(2, '0');
      }

      const dateTimeString = formData.appointmentDateTime;
      const appointmentDate = new Date(dateTimeString);
      const appointmentTime = formatTime(appointmentDate);

      const dataToSend = {
        scheduleId: this.ds[0].id,
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        appointmentDate: appointmentDate.toISOString().split('T')[0], 
        appointmentTime: appointmentTime,
        status: formData.status,
      };


      this.getlistService.postappointment(dataToSend).subscribe(() => {
        this.appointmentForm.reset()
        this.showDynamicContainer = true;

      });
    } else {
      this.markFormGroupTouched(this.appointmentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getDoctorsBySpecializationId(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const specializationId = +selectElement.value;
    if (!isNaN(specializationId)) {
      this.getlistService
        .getDoctorbySpec(specializationId)
        .subscribe((data) => {
          this.doctors = data;
        });
    }
  }

  getDoctorScheduleByDoctorId(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.docId = +selectElement.value;
    if (!isNaN(this.docId)) {
      this.getlistService
        .getdoctorscheduleByDocId(this.docId)
        .subscribe((data) => {
          this.doctorschedule = data;
        });
    }
  }

  getDoctorScheduleByAppointmentDateTime(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const appointmentDateTimeString = inputElement.value;

    const appointmentDateTime = new Date(appointmentDateTimeString);
    const appointmentDate = formatDate(appointmentDateTime);
    const appointmentTime = formatTime(appointmentDateTime);

    function formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = padNumber(date.getMonth() + 1);
      const day = padNumber(date.getDate());
      return `${year}-${month}-${day}`;
    }

    function formatTime(date: Date): string {
      const hours = padNumber(date.getHours());
      const minutes = padNumber(date.getMinutes());
      return `${hours}:${minutes}`;
    }

    function padNumber(num: number): string {
      return num.toString().padStart(2, '0');
    }

    this.getlistService
      .getdocschedulebyAppointmentDateTime(
        this.docId,
        appointmentDate,
        appointmentTime
      )
      .subscribe(
        (data) => {
          this.ds = data;
        },
        (error) => {
          console.error('Error fetching doctor schedule:', error);
        }
      );
  }

  private formatDateTime(date: Date): string {
    const formattedDate = date.toISOString().slice(0, 16);
    return formattedDate;
  }
}
