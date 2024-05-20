import { Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { doctorSchedules } from './model/doctorschedule.model';
import { GetListService } from '../../../service/get-list.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss']
})
export class DoctorScheduleComponent extends ComponentBase{
  @Input() doctorId!: number; 
  doctorSchedules: doctorSchedules[] = [];
  editedSchedule: doctorSchedules = {} as doctorSchedules;
  newSchedule: doctorSchedules = {} as doctorSchedules; 
  showEditModal = false; 
  showDeleteModal = false; 
  scheduleToDeleteId!: number;
  getRoles!:string;
  override initVariables(): void {
  }

  getRole():string{
   if(this.authService.isLoggedIn()){
    this.getRoles=this.authService.getLocalStorageDetails().roleName
   }
   return this.getRoles
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
override ngOnInit(): void {
  this.getDoctorSchedules(this.doctorId);
}
  constructor(private getlistservice:GetListService,private authService:AuthService) {super() }

  getDoctorSchedules(doctorId: number) {
    this.getlistservice.getdoctorscheduleByDocId(doctorId)
      .subscribe((schedules) => {this.doctorSchedules = schedules});
  }
  editSchedule(schedule:any){
    this.editedSchedule = { ...schedule };
    this.showEditModal = true;
  }
  confirmDeleteSchedule(schedule: any): void {
    this.scheduleToDeleteId = schedule.id; 
    this.showDeleteModal = true;
  }

  deleteConfirmed(): void {
    if (this.scheduleToDeleteId) {
      this.getlistservice.deletedoctorschedule(this.scheduleToDeleteId)
        .subscribe((response) => {
          this.getDoctorSchedules(this.doctorId);
          this.closeDeleteModal();
          location.reload();
        });
    }
  }
  addSchedule(){
    if (this.doctorSchedules.length < 7) {
      this.newSchedule.startTime = this.convertTimeTo24HourFormat(this.newSchedule.startTime);
      this.newSchedule.endTime = this.convertTimeTo24HourFormat(this.newSchedule.endTime);
      this.newSchedule.doctorID = this.doctorId;

      this.getlistservice.adddoctorschedule(this.newSchedule)
        .subscribe((response) => {
          this.getDoctorSchedules(this.doctorId);
        });
    }
  }

  private convertTimeTo24HourFormat(timeString: string): string {
    const time = new Date('1970-01-01T' + timeString); 
    return time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  }
  submitEditSchedule(): void {
    this.editedSchedule.doctorID= this.doctorId; 
    this.getlistservice.updatedoctorscheduel(this.editedSchedule)
      .subscribe(() => {
        this.showEditModal = false;
        this.getDoctorSchedules(this.doctorId);
        location.reload(); 
      });
  }
  closeEditModal(): void {
    this.showEditModal = false;
  }
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.scheduleToDeleteId = 0; 
  }

}
