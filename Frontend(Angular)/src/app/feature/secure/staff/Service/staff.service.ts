import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRole } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private communicationService: CommunicationService) {}
  getStaff(queryParams: any): Observable<any> {
    return this.communicationService.get<any>(
      UserAPI.listStaff(queryParams),
      null,
      null,
      true,
      false
    );
  }
  getStaffList(): Observable<any> {
    return this.communicationService.get(
      environment.apiBaseUrl + 'api/Staff/Get',
      null,
      null,
      true,
      false
    );
  }
  getStaffById(id: number): Observable<any> {
    return this.communicationService.get(
      `${environment.apiBaseUrl}api/Staff/Get?id=${id}`,
      null,
      null,
      true,
      false
    );
  }
  addStaff(staff: any): Observable<any> {
    return this.communicationService.post(
      environment.apiBaseUrl + 'api/Staff/Post',
      staff,
      null,
      null,
      true
    );
  }
  updateStaff(staff: any): Observable<any> {
    return this.communicationService.put<any>(
      environment.apiBaseUrl + 'api/Staff/Put',
      staff,
      null,
      null,
      true
    );
  }
  deleteStaff(id: number): Observable<any> {
    return this.communicationService.delete<any>(
      `${environment.apiBaseUrl}api/Staff/Delete?id=${id}`,
      null,
      null,
      true
    );
  }
  getRoles(): Observable<IRole> {
    return this.communicationService.get(
      environment.apiBaseUrl + 'api/Role/GetRole',
      null,
      null,
      true,
      false
    );
  }
}
