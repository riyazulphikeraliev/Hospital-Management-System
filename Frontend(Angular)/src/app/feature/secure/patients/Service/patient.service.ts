import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private communicationService: CommunicationService) {}

  getPatient(queryParams: any): Observable<any> {
    return this.communicationService.get<any>(
      UserAPI.getPatients(queryParams),
      null,
      null,
      true,
      false
    );
  }
  getPatients(): Observable<any> {
    return this.communicationService.get<any>(
      environment.apiBaseUrl + 'api/Patients/Get',
      null,
      null,
      true,
      false
    );
  }
  getPatientByUserId(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Patients/Get?userId=${id}`,
      null,
      null,
      true,
      false
    );
  }
  getPatientById(id: number): Observable<any> {
    const url = `${environment.apiBaseUrl}api/Patients/Get?id=${id}`;
    return this.communicationService.get<any>(url, null, null, true, false);
  }

  addPatient(patient: any): Observable<any> {
    return this.communicationService.post<any>(
      environment.apiBaseUrl + 'api/Patients/Post',
      patient,
      null,
      null,
      true
    );
  }
  deletePatient(id: number): Observable<any> {
    const url = `${environment.apiBaseUrl}api/Patients/Delete?id=${id}`;
    return this.communicationService.delete<any>(url, null, null, true);
  }

  updatePatient(patient: any): Observable<any> {
    return this.communicationService.put<any>(
      environment.apiBaseUrl + 'api/Patients/Put',
      patient,
      null,
      null,
      true
    );
  }
  GetAppointmentsByPatientId(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Appointment/Get?patid=${id}`,
      null,
      null,
      true,
      false
    );
  }
  GetBillByPatienId(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Bill/Get?patid=${id}`,
      null,
      null,
      true,
      false
    );
  }
  GetMRBypatientId(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/MedicalRecords/Get?pid=${id}`,
      null,
      null,
      true,
      false
    );
  }
}
