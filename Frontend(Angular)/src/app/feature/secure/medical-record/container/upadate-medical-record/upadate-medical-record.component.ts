import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { MedicalRecordService } from '../../Service/medical-record.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-upadate-medical-record',
  templateUrl: './upadate-medical-record.component.html',
  styleUrls: ['./upadate-medical-record.component.scss'],
})
export class UpadateMedicalRecordComponent extends ComponentBase {
  override unload(): void {}

  updateMedicalRecordForm!: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  medicalRecordId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.load();
    this.getMedicalRecordDetails();
  }

  override initVariables(): void {
    this.updateMedicalRecordForm = this.formBuilder.group({
      Id: ['', Validators.required],
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

  override load(): void {
    this.medicalRecordId = this.route.snapshot.params['id'];
  }

  getMedicalRecordDetails(): void {
    this.medicalRecordService
      .getMRbyId(this.medicalRecordId)
      .subscribe((medicalRecord: any) => {
        const formattedMRDate = medicalRecord[0].date
          ? formatDate(medicalRecord[0].date, 'yyyy-MM-dd', 'en-US')
          : null;

        this.updateMedicalRecordForm.patchValue({
          Id: medicalRecord[0].id,
          patientId: medicalRecord[0].patientId,
          doctorId: medicalRecord[0].doctorId,
          date: formattedMRDate,
          diagnosis: medicalRecord[0].diagnosis,
          prescription: medicalRecord[0].prescription,
          testResults: medicalRecord[0].testResults,
        });
      });
  }

  onSubmit(): void {
    if (this.updateMedicalRecordForm.valid) {
      this.medicalRecordService
        .UpdateMR(this.updateMedicalRecordForm.value)
        .subscribe(
          () => {
            this.router.navigate(['/secure/MedicalRecord/get-MR']);
          },
          (error: any) => {
            console.error('Error updating medical record:', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }
}
