import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdminService } from '../../Service/admin.service';
import { formatDate } from '@angular/common';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent extends ComponentBase {
  adminForm!:FormGroup
  adminId!: number;
  userId!:number;


  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route:ActivatedRoute,
    private authService:AuthService
  ) { super();
    const urlSegments = this.router.url.split('/');
    if (urlSegments.includes('update-admin')) {
      this.route.params.subscribe(params => {
        this.adminId = params['id'];
      });
    } else {
      this.userId = this.authService.getLocalStorageDetails().userId;
      if (this.userId) {
       this.adminService.getAdminByUserId(this.userId).subscribe((data)=>{
        this.adminId=data[0].id
        this.getAdminDetails()
       })
      }
    }
  }
 
override initVariables(): void {
  this.adminForm=new FormGroup({
    Id: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    imagePath:new FormControl(''),
    username: new FormControl('', Validators.required),
    password:new FormControl('', Validators.required),
    
  });
}

  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables()
    this.getAdminDetails();
  }
  getAdminDetails(){
    if (this.adminId) {
      this.adminService.getAdminById(this.adminId).subscribe((admin) => {
        const formattedDateOfBirth = admin[0].dateOfBirth ? formatDate(admin[0].dateOfBirth, 'yyyy-MM-dd', 'en-US') : null;

        this.adminForm.patchValue({
          Id: admin[0].id,
          username: admin[0].userName,
          password: admin[0].password,
          firstName: admin[0].firstName,
          lastName: admin[0].lastName,
          email: admin[0].email,
          contactNumber: admin[0].contactNumber,
          imagePath: admin[0].imagePath,
          address:admin[0].address,
          dateOfBirth:formattedDateOfBirth
        });
      });
    }
  }



  onSubmit(): void {

    if (this.adminForm.valid) {
      this.adminService.updateAdmin(this.adminForm.value).subscribe((data: any) => {
        const currentUrl = this.router.url;
        if (currentUrl.includes('/secure/admin')) {
          this.router.navigate(['/secure/admin/view-admin', this.adminId]);
        } else if (currentUrl.includes('/secure/profile/updateAdmin')) {
         
          this.router.navigate(['/secure/profile']);
        } else {
          this.router.navigate(['/']);
        }
      });
    } else {
    }
  }

}
