import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {

  constructor(private communicationService: CommunicationService) { }

  getBookedAppointments(queryParams: any): Observable<any> {
    return this.communicationService.get(UserAPI.listAppointments(queryParams),null,null,true,false);
  }

  getBookedAppointmentsList(): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Appointment/Get`,null,null,true,false);
  }

  getBookedAppointmentById(id: number): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Appointment/Get?id=${id}`,null,null,true,false);
  }

  getPatients(): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Patients/Get`,null,null,true,false);
  }

  getDoctors(): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Doctor/GetDoctors`,null,null,true,false);
  }

  getSpecializations(): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Specialization/Get`,null,null,true,false);
  }

  updateBookedAppointment(appointment: any): Observable<any> {
    return this.communicationService.put<any>(`${environment.apiBaseUrl}api/Appointment/Put`, appointment,null,null,true);
  }

  deleteBookedAppointment(id: number): Observable<any> {
    return this.communicationService.delete<any>(`${environment.apiBaseUrl}api/Appointment/Delete?id=${id}`,null,null,true);
  }
}
