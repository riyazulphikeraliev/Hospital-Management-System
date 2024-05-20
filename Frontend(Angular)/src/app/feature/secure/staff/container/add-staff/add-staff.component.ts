import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@shared/abstracts/component-base';
import { StaffService } from '../../Service/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent extends ComponentBase {
  addStaffForm!: FormGroup;
  roles: any[] = [];

  override initVariables(): void {
    this.staffService.getRoles().subscribe((data: any) => {
      this.roles = data;
    });
  }
  override subscribeEvents(): void {}
  override load(): void {}
  override unload(): void {}

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private router: Router
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.createForm();
    this.initVariables();
  }
  createForm(): void {
    this.addStaffForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      roleId: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addStaffForm.valid) {
      this.staffService.addStaff(this.addStaffForm.value).subscribe(
        () => {
          this.router.navigate(['/secure/staff/get-staff']);
        },
        (error) => {
          console.error('Error adding staff:', error);
        }
      );
    }
  }
}
