import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { BookAppointmentService } from '../../service/book-appointment.service';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss'],
})
export class UpdateAppointmentComponent extends ComponentBase {
  updateAppointmentForm!: FormGroup;
  doctors: any[] = [];
  appointmentId: number = 0;
  patients: any[] = [];

  override initVariables(): void {
    this.updateAppointmentForm = this.formBuilder.group({
      id: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime:['',Validators.required],
      status: ['', Validators.required],
      scheduleId:['',Validators.required]
    });
  }
  override subscribeEvents(): void {
    this.bookAppointmentService.getPatients().subscribe((data) => {
      this.patients=data
    });
    this.bookAppointmentService.getDoctors().subscribe(
      (doctors: any[]) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
    this.bookAppointmentService.getDoctors().subscribe(
      (doctors: any[]) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  override load(): void {}
  override unload(): void {}

  constructor(
    private formBuilder: FormBuilder,
    private bookAppointmentService: BookAppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.loadAppointmentDetails();
  }

  loadAppointmentDetails(): void {
    this.appointmentId = this.route.snapshot.params['id'];
    this.bookAppointmentService
      .getBookedAppointmentById(this.appointmentId)
      .subscribe(
        (appointment: any) => {
          const appointmentDate = new Date(appointment[0].appointmentDate);

      const formattedAppointmentDate = this.formatDate(appointmentDate);
          this.updateAppointmentForm.patchValue({
            id: appointment[0].id,
            patientId: appointment[0].patientId,
            doctorId: appointment[0].doctorId,
            appointmentDate: formattedAppointmentDate,
            appointmentTime: appointment[0].appointmentTime,
            status: appointment[0].status,
            scheduleId:appointment[0].scheduleId
          });
        },
        (error) => {
          console.error('Error fetching appointment details:', error);
        }
      );
    
  }
  override  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.updateAppointmentForm.valid) {
      this.bookAppointmentService
        .updateBookedAppointment(this.updateAppointmentForm.value)
        .subscribe(
          () => {
            this.router.navigate(['/secure/BookAppointment/get-appointment']);
          },
          (error) => {
            console.error('Error updating appointment:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
