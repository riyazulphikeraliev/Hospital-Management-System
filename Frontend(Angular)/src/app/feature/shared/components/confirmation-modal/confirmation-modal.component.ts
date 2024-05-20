import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppConfig } from '@core/configs';
import { AuthService } from '@core/services/auth.service';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent extends ComponentBase {
  someInputProperty!: string; 
  someOutputEvent: EventEmitter<string> = new EventEmitter<string>(); 
  isVisible: boolean = true; 
  RoleName!:string
  UserId!:number
  patient!:any

  closeModal() {
    this.isVisible = false;
    location.reload()
  }
  constructor(private authService:AuthService,private getlistService:GetListService) {
    super();
  }

  isLoggedOut(): boolean {
    const token = localStorage.getItem(AppConfig.auth.token);

    return !token;
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getRoleName(): string {
    if (this.isLoggedIn()) {
      this.RoleName = this.authService.getLocalStorageDetails().roleName;
    }
    return this.RoleName;
  }

  getUserId(): number {
    if (this.isLoggedIn()) {
      this.UserId = this.authService.getLocalStorageDetails().userId;
    }
    return this.UserId;
  }
  override initVariables(): void {
    if(this.isLoggedIn()&&this.getRoleName()==='Patient'){
      this.getlistService.getPatientByUserId(this.getUserId()).subscribe(data=>{
        this.patient=data[0]
      })
    }


  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

 

}
