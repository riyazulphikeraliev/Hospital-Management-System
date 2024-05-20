import { Injectable } from '@angular/core';
import { CommunicationService } from '@core/services/communication.service';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientBillService {

  constructor(private communicationService:CommunicationService) { }

  getBill(queryParams:any):Observable<any>{
return this.communicationService.get<any>(UserAPI.listBill(queryParams),null,null,true,false)  
}
  getBills(){
return this.communicationService.get<any>(environment.apiBaseUrl + 'api/Bill/Get',null,null,true,false)
  }
  getBillById(id:number){
return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Bill/Get?id=${id}`,null,null,true,false)
  }
  addBill(bill:any){
return this.communicationService.post<any>(`${environment.apiBaseUrl}api/Bill/Post`,bill,null,null,true)
  }
  updateBill(bill:any){
    return this.communicationService.put<any>(`${environment.apiBaseUrl}api/Bill/Put`,bill,null,null,true)
  }
  deleteBill(id:number){
return this.communicationService.delete<any>(`${environment.apiBaseUrl}api/Bill/Delete?id=${id}`,null,null,true)
  }
  getPatients(){
return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Patients/Get`,null,null,true,false)
  }
  getDoctors(){
return this.communicationService.get<any>(`${environment.apiBaseUrl}api/Doctor/GetDoctors`,null,null,true,false)
  }
}
