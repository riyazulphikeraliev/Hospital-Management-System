import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { Observable } from 'rxjs';
import { IDoctor } from 'src/app/feature/shared/models/doctor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private communicationService: CommunicationService) {}

  addDoctor(doctor: IDoctor): Observable<any> {
    return this.communicationService.post<any>(
      environment.apiBaseUrl + 'api/Doctor/PostDoctors',
      doctor,
      null,
      null,
      true
    );
  }

  getDoctorById(id: number): Observable<IDoctor> {
    const url = `${environment.apiBaseUrl}api/Doctor/GetDoctors?id=${id}`;
    return this.communicationService.get<any>(url, null, null, true, false);
  }
  getDoctorByUserId(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Doctor/GetDoctors?userId=${id}`,
      null,
      null,
      true,
      false
    );
  }

  updateDoctor(doctor: any): Observable<any> {
    return this.communicationService.put<any>(
      environment.apiBaseUrl + 'api/Doctor/PutDoctors',
      doctor,
      null,
      null,
      true
    );
  }
  getSpecialization(): Observable<any> {
    return this.communicationService.get<any>(
      environment.apiBaseUrl + 'api/Specialization/Get',
      null,
      null,
      true,
      false
    );
  }

  deleteDoctor(id: number): Observable<any> {
    const url = `${environment.apiBaseUrl}api/Doctor/DeleteDoctors?id=${id}`;
    return this.communicationService.delete<any>(url, null, null, true);
  }
}
