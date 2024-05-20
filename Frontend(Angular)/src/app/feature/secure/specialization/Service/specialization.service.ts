import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  constructor(private communicationService: CommunicationService) {}
  getSpecs(queryParams: any): Observable<any> {
    return this.communicationService.get<any>(
      UserAPI.listSpec(queryParams),
    );
  }

  getSpec(): Observable<any> {
    return this.communicationService.get<any>(
      environment.apiBaseUrl + 'api/Specialization/Get',
      null,
      null,
      true,
      false
    );
  }
  getSpecById(id: number): Observable<any> {
    return this.communicationService.get<any>(
      `${environment.apiBaseUrl}api/Specialization/Get?id=${id}`,
      null,
      null,
      true,
      false
    );
  }
  addSpec(spec: any): Observable<any> {
    return this.communicationService.post<any>(
      environment.apiBaseUrl + 'api/Specialization/Post',
      spec,
      null,
      null,
      true
    );
  }
  updateSpec(spec: any): Observable<any> {
    return this.communicationService.put<any>(
      environment.apiBaseUrl + 'api/Specialization/Put',
      spec,
      null,
      null,
      true
    );
  }
  deleteSpec(id: number): Observable<any> {
    return this.communicationService.delete<any>(
      `${environment.apiBaseUrl}api/Specialization/Delete?id=${id}`,
      null,
      null,
      true
    );
  }
}
