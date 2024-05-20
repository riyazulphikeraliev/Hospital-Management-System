import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private communicationService: CommunicationService) {}
  getAdminByUserId(id:number): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Admin/Get?userId=${id}`,null,null,true,false);
  }
  getPatientByUserId(id:number): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Patients/Get?userId=${id}`,null,null,true,false);
  }
  getDoctorByUserId(id:number): Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Doctor/GetDoctors?userId=${id}`,null,null,true,false);
  }

  ChangeUserPassword(data:any):Observable<any>{
    return this.communicationService.post<any>(`${environment.apiBaseUrl}api/Login/ChangePassword`,data,null,null,true)
  }
  GetAppointmentsByPatientId(id:number):Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Appointment/Get?patid=${id}`,null,null,true,false);
  }
  GetAppointmentsByDoctorId(id:number):Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Appointment/Get?docid=${id}`,null,null,true,false);

  }
  GetMRBypatientId(id:number):Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/MedicalRecords/Get?pid=${id}`,null,null,true,false);
  }
  GetMRByDoctorId(id:number):Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/MedicalRecords/Get?did=${id}`,null,null,true,false);
  }
  GetBillByPatienId(id:number):Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Bill/Get?patid=${id}`,null,null,true,false);
  }
  getMRbyDocId(id:number):Observable<any> {
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/MedicalRecords/Get?did=${id}`,null,null,true,false);
  }
  GetBillForReport():Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Bill/ForGraph`,null,null,true,false);
  }
  GetWardForReport():Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Wards/Get`,null,null,true,false);
  }

}
