import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDoctor } from '../models/doctor.model';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GetListService {
  constructor(private CommunicationService: CommunicationService) {}
  getDoctor(): Observable<any> {
    return this.CommunicationService.get<any>(
      environment.apiBaseUrl + 'api/Doctor/GetDoctors',
      null,
      null,
      true,
      false
    );
  }
  getDoctorbySpec(id: number): Observable<any> {
    return this.CommunicationService.get<any>(
      environment.apiBaseUrl + 'api/Doctor/GetDoctors?SpecializationID=' + id,
      null,
      null,
      true,
      false
    );
  }

  getDoctors(queryParams: any): Observable<any> {
    return this.CommunicationService.get<any>(
      UserAPI.listDoctors(queryParams),
      null,
      null,
      true,
      false
    );
  }
  getDoctorById(id: number): Observable<IDoctor[]> {
    const url = `${environment.apiBaseUrl}api/Doctor/GetDoctors?id=${id}`;
    return this.CommunicationService.get<any>(url, null, null, true, false);
  }

  getSpecialization(): Observable<any> {
    return this.CommunicationService.get<any>(
      environment.apiBaseUrl + 'api/Specialization/Get',
      null,
      null,
      true,
      false
    );
  }
  deleteDoctor(id: number): Observable<any> {
    const url = `${environment.apiBaseUrl}api/Doctor/DeleteDoctors?id=${id}`;
    return this.CommunicationService.delete<any>(url, null, null, true);
  }
  getpatient(): Observable<any> {
    return this.CommunicationService.get<any>(
      environment.apiBaseUrl + 'api/Patients/Get',
      null,
      null,
      true,
      false
    );
  }

  getdoctorscheduleByDocId(id: number): Observable<any> {
    return this.CommunicationService.get<any>(
      `${environment.apiBaseUrl}api/DSchedule/Get?docid=${id}`,
      null,
      null,
      true,
      false
    );
  }

  adddoctorschedule(ds: any): Observable<any> {
    return this.CommunicationService.post<any>(
      `${environment.apiBaseUrl}api/DSchedule/Post`,
      ds,
      null,
      null,
      true
    );
  }
  updatedoctorscheduel(ds: any): Observable<any> {
    return this.CommunicationService.put<any>(
      `${environment.apiBaseUrl}api/DSchedule/Put`,
      ds,
      null,
      null,
      true
    );
  }
  deletedoctorschedule(id: number): Observable<any> {
    return this.CommunicationService.delete<any>(
      `${environment.apiBaseUrl}api/DSchedule/Delete?id=${id}`,
      null,
      null,
      true
    );
  }

  getdocschedulebyAppointmentDateTime(
    doctorId: number,
    appointmentDate: string,
    appointmentTime: string
  ): Observable<any> {
    const params = {
      docid: doctorId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
    };
    return this.CommunicationService.get<any>(
      UserAPI.listDoctorSchedule(params),
      null,
      null,
      true,
      false
    );
  }

  postappointment(data: any): Observable<any> {
    return this.CommunicationService.post<any>(
      `${environment.apiBaseUrl}api/Appointment/Post`,
      data,
      null,
      null,
      true
    );
  }
  getAdminByUserId(id: number): Observable<any> {
    return this.CommunicationService.get<any>(
      `${environment.apiBaseUrl}api/Admin/Get?userId=${id}`,
      null,
      null,
      true,
      true
    );
  }
  getPatientByUserId(id: number): Observable<any> {
    return this.CommunicationService.get<any>(
      `${environment.apiBaseUrl}api/Patients/Get?userId=${id}`,
      null,
      null,
      true,
      true
    );
  }
  getDoctorByUserId(id: number): Observable<any> {
    return this.CommunicationService.get<any>(
      `${environment.apiBaseUrl}api/Doctor/GetDoctors?userId=${id}`,
      null,
      null,
      true,
      true
    );
  }
}
