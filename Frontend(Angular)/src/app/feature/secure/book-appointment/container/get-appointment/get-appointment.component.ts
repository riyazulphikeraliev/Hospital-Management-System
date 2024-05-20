import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { BookAppointmentService } from '../../service/book-appointment.service';


@Component({
  selector: 'app-get-appointment',
  templateUrl: './get-appointment.component.html',
  styleUrls: ['./get-appointment.component.scss']
})
export class GetAppointmentComponent extends ComponentBase implements OnInit {

  bookedAppointments: any[] = [];
  searchText: string = '';
  searchOption: string = '';
  appointmentId: number = 0;

  constructor(private bookAppointmentService: BookAppointmentService) { 
    super();
  }

  override initVariables(): void {
  }

  override subscribeEvents(): void {
    this.bookAppointmentService.getBookedAppointmentsList().subscribe((data: any) => {
      this.bookedAppointments = data;
    });
  }

  override load(): void {
  }

  override unload(): void {
  }

  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.load();
  }

  search(): void {
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.bookAppointmentService.getBookedAppointments(queryParams).subscribe(
      (res: any) => {
        this.bookedAppointments = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setId(appointmentId: number): void {
    this.appointmentId = appointmentId;
  }

  delete(): void {
    this.bookAppointmentService.deleteBookedAppointment(this.appointmentId).subscribe(() => {
      location.reload(); 
    });
  }

 
}
