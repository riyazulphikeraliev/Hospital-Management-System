import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private communicationService:CommunicationService) { }

  getAdmission(queryParams:any):Observable<any>{
    return this.communicationService.get<any>(UserAPI.listAdmission(queryParams),null,null,true,false)
  }
  getAdmissionList(){
 return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Admission/Get',null,null,true,false)
  }
  getAdmissionById(id:number){
    const url = `${environment.apiBaseUrl}api/Admission/Get?admissionId=${id}`;

    return this.communicationService.get<any>(url,null,null,true,false)

  }
  addAdmission(admission:any){
return this.communicationService.post<any>(environment.apiBaseUrl + 'api/Admission/Post',admission,null,null,true)
  }
  UpdateAdmission(admission:any){
return this.communicationService.put<any>(environment.apiBaseUrl + 'api/Admission/Put',admission,null,null,true)
  }
  deleteAdmission(id:number){
return this.communicationService.delete<any>(environment.apiBaseUrl + 'api/Admission/Delete?admissionId='+id)
  }
  getPatients():Observable<any>{
    return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Patients/Get',null,null,true,false)
  }
  getDoctors():Observable<any>{
    return this.communicationService.get<any>(environment.apiBaseUrl +'api/Doctor/GetDoctors',null,null,true,false)
  }
  getWards():Observable<any>{
    return this.communicationService.get<any>(environment.apiBaseUrl +'api/Wards/Get',null,null,true,false)
  }
  
}
