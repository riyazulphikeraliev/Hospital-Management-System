import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicalRecordService } from '../../Service/medical-record.service';

@Component({
  selector: 'app-add-medical-record',
  templateUrl: './add-medical-record.component.html',
  styleUrls: ['./add-medical-record.component.scss'],
})
export class AddMedicalRecordComponent extends ComponentBase {
  addMedicalRecordForm!: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];

  override initVariables(): void {
    this.addMedicalRecordForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      diagnosis: ['', Validators.required],
      prescription: ['', Validators.required],
      testResults: ['', Validators.required],
    });
  }

  override subscribeEvents(): void {
    this.medicalRecordService.getPatient().subscribe((patients: any) => {
      this.patients = patients;
    });
    this.medicalRecordService.getDoctor().subscribe((doctors: any) => {
      this.doctors = doctors;
    });
  }

  override load(): void {}

  override unload(): void {}

  constructor(
    private formBuilder: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.load();
  }

  onSubmit(): void {
    if (this.addMedicalRecordForm.valid) {
      this.medicalRecordService
        .addMR(this.addMedicalRecordForm.value)
        .subscribe(
          () => {
            const currentUrl = this.router.url;

            if (currentUrl.includes('/secure/MedicalRecord')) {
              this.router.navigate(['/secure/MedicalRecord/get-MR']);
            } else {
              this.router.navigate(['secure/profile']);
            }
          },
          (error: any) => {
            console.error('Error adding medical record:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
