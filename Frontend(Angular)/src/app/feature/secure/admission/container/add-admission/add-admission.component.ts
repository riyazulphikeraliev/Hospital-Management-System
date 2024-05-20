import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdmissionService } from '../../Service/admission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admission',
  templateUrl: './add-admission.component.html',
  styleUrls: ['./add-admission.component.scss']
})
export class AddAdmissionComponent extends ComponentBase{

  addAdmissionForm!: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  wards: any[] = [];

  constructor(private fb: FormBuilder, private admissionService: AdmissionService, private router: Router) {
    super();
  }

  override initVariables(): void {
    this.admissionService.getPatients().subscribe(data => {
      this.patients = data;
    });
    this.admissionService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
    this.admissionService.getWards().subscribe(data => {
      this.wards = data;
    });  }

  override subscribeEvents(): void {
  }

  override load(): void {
  }

  override unload(): void {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.createForm();
    this.initVariables();

  }

  createForm(): void {
    this.addAdmissionForm = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      wardId: ['', Validators.required],
      wardNumber: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if (this.addAdmissionForm.valid) {
      this.admissionService.addAdmission(this.addAdmissionForm.value).subscribe(
        () => {
          this.router.navigate(['/secure/admission/get-admission']);
        },
        (error) => {
          console.error('Error adding admission:', error);
        }
      );
    }
  }
}
