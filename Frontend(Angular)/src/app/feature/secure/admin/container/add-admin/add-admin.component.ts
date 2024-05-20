import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent extends ComponentBase {
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { super()}
  override initVariables(): void {
    this.adminForm =new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      imagePath:new FormControl(''),
      userName: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      
    });
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      this.adminService.addAdmin(this.adminForm.value).subscribe(
        (data: any) => {
          this.router.navigate(['/secure/admin/get-admin']);
        },
        (error: any) => {
          console.error('Error adding admin:', error);
        }
      );
    }
  }


 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 override ngOnInit(): void {
  this.initVariables()
  }

}
