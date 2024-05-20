import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WardService {

  constructor(private communicationService:CommunicationService) { }
  getward(queryParams:any):Observable<any> {
    return this.communicationService.get<any>(UserAPI.listWards(queryParams),null,null,true,false);
  }
  getWards():Observable<any>{
    return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Wards/Get',null,null,true,false);
  }
  getWardById(id:number):Observable<any>{
    return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Wards/Get?id=${id}`,null,null,true,false);
  }
  addWard(ward:any):Observable<any>{
    return this.communicationService.post<any>(environment.apiBaseUrl + 'api/Wards/Post',ward,null,null,true);
  }
  UpdateWard(ward:any):Observable<any>{
    return this.communicationService.put<any>(environment.apiBaseUrl + 'api/Wards/Put',ward,null,null,true);
  }
  deleteWard(id:number):Observable<any>{
    return this.communicationService.delete<any>(`${environment.apiBaseUrl}api/Wards/Delete?id=${id}`,null,null,true);
  }
}
