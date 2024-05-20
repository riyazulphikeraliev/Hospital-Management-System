import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdminService } from '../../Service/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-admin-user-mgmt',
  templateUrl: './admin-user-mgmt.component.html',
  styleUrls: ['./admin-user-mgmt.component.scss']
})
export class AdminUserMgmtComponent extends ComponentBase{
  addRoleForm!: FormGroup;
  userId!:number

  override initVariables(): void {
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initForm();
 
  }

  initForm():void{
    this.addRoleForm=new FormGroup({
     roleName:new FormControl('',Validators.required),
    })
  }

  showRoleForm = false; 
  
  toggleRoleForm() {
    this.showRoleForm = !this.showRoleForm;
  }
  
  onSubmit() {
    if(this.addRoleForm.valid){
      this.adminService.addRole(this.addRoleForm.value).subscribe(
        (res) => {
          this.addRoleForm.reset();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  
}

  constructor(private adminService:AdminService,private authSerive:AuthService) { super();
    this.userId=authSerive.getLocalStorageDetails().userId
  }

  

}
