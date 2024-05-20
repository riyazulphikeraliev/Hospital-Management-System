import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@shared/abstracts/component-base';
import { Subject } from 'rxjs';
import { StaffService } from '../../Service/staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent extends ComponentBase {

  updateStaffForm!: FormGroup;
  roles: any[] = []; 
  staffId!:number;
  constructor(private formBuilder:FormBuilder,private staffService:StaffService,private route:ActivatedRoute,private router:Router) { super();
    this.staffId=this.route.snapshot.params['id'];
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 
  override initVariables(): void {
    this.updateStaffForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      roleId: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
  override formatDate(date: string | Date | null) {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables()
    this.getRoles();
    this.getStaffDetails()

  }


  getStaffDetails(){
    this.staffService.getStaffById(this.staffId).subscribe((staff:any)=>{
      this.updateStaffForm.patchValue({
        id: staff[0].id,
      firstName: staff[0].firstName,
      lastName: staff[0].lastName,
      position: staff[0].position,
      roleId:staff[0].roleId ,
      contactNumber: staff[0].contactNumber,
      email: staff[0].email,
      address: staff[0].address
          })
    })
  }

  getRoles(): void {
    this.staffService.getRoles().subscribe((roles: any) => {
      this.roles = roles;
    });
  }
  onSubmit(){
    if (this.updateStaffForm.valid) {
      this.staffService.updateStaff(this.updateStaffForm.value).subscribe((response) => {
        this.router.navigate(['/secure/staff/get-staff']);
      }, (error) => {
        console.error('Error updating staff:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
