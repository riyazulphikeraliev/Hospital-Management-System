import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private communicationService: CommunicationService) {}

  addRole(role: any): Observable<any> {
    return this.communicationService.post<any>(
      environment.apiBaseUrl + 'api/Role/AddRole',
      role,
      null,
      null,
      true
    );
  }
  addAdmin(admin: any): Observable<any> {
    return this.communicationService.post<any>(
      environment.apiBaseUrl + 'api/Admin/Post',
      admin,
      null,
      null,
      true
    );
  }
  getAdmin(): Observable<any> {
    return this.communicationService.get<any>(
      environment.apiBaseUrl + 'api/Admin/Get',
      null,
      'Loading',
      true,
      false
    );
  }
  getAdminById(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Admin/Get?id=${id}`,
      null,
      null,
      true,
      false
    );
  }
  getAdminByUserId(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Admin/Get?userId=${id}`,
      null,
      null,
      true,
      false
    );
  }
  updateAdmin(admin: any): Observable<any> {
    return this.communicationService.put<any>(
      environment.apiBaseUrl + 'api/Admin/Put',
      admin,
      null,
      null,
      true
    );
  }
  deleteAdmin(id: number): Observable<any> {
    return this.communicationService.delete<any>(
      `${environment.apiBaseUrl}api/Admin/Delete?id=${id}`,
      null,
      null,
      true
    );
  }
}
