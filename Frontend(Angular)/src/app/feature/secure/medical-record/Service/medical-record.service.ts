import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  constructor(private communicationService:CommunicationService) { }

   getMR(queryParams:any):Observable<any>{
    return this.communicationService.get(UserAPI.listMR(queryParams),null,null,true,false)
  }

    getMRs():Observable<any>{
return this.communicationService.get<any>(`${environment.apiBaseUrl}api/MedicalRecords/Get`,null,null,true,false)

    }
    getMRbyId(id:number):Observable<any> {
      return this.communicationService.get<any>(`${environment.apiBaseUrl}api/MedicalRecords/Get?id=${id}`,null,null,true,false);
    }
    getPatient():Observable<any>{
return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Patients/Get',null,null,true,false)
    }
    getDoctor():Observable<any>{
return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Doctor/GetDoctors',null,null,true,false)
    }
    getSpecialization():Observable<any>{
return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Specialization/Get',null,null,true,false)
    }
    addMR(Mr:any):Observable<any>{
return this.communicationService.post<any>(environment.apiBaseUrl + 'api/MedicalRecords/Post', Mr,null,null,true)
    }
    UpdateMR(Mr:any){
return this.communicationService.put<any>(environment.apiBaseUrl + 'api/MedicalRecords/Put',Mr,null,null,true)
    }
    deleteMR(id:number):Observable<any>{
return this.communicationService.delete<any>(`${environment.apiBaseUrl}api/MedicalRecords/Delete?id=${id}`,null,null,true)
    }
}

