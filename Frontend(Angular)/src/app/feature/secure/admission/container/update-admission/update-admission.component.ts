import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdmissionService } from '../../Service/admission.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-admission',
  templateUrl: './update-admission.component.html',
  styleUrls: ['./update-admission.component.scss']
})
export class UpdateAdmissionComponent extends ComponentBase {
  updateAdmissionForm!: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  wardTypes: any[] = [];
  admissionId!: number;

  override initVariables(): void {
    this.updateAdmissionForm = this.formBuilder.group({
      id: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      wardId: ['', Validators.required],
      wardNumber: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required]
    });
  }
  override subscribeEvents(): void {
    this.admissionService.getPatients().subscribe((patients: any) => {
      this.patients = patients;
    });
    this.admissionService.getDoctors().subscribe((doctors: any) => {
      this.doctors = doctors;
    });
    this.admissionService.getWards().subscribe((wards:any)=>{
      this.wardTypes=wards;
    })
  }
  override load(): void {

  }
  override unload(): void {
  }

  constructor(private formBuilder: FormBuilder,
    private admissionService: AdmissionService,
    private route: ActivatedRoute,
    private router: Router) {super() ;
      this.admissionId = this.route.snapshot.params['id'];

    }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.getAdmissionDetails();
  }
  getAdmissionDetails(): void {
    this.admissionService.getAdmissionById(this.admissionId).subscribe((admission: any) => {
      const formattedAdmissionDate = admission[0].admissionDate ? formatDate(admission[0].admissionDate, 'yyyy-MM-dd', 'en-US') : null;
      const formattedDischargeDate = admission[0].dischargeDate ? formatDate(admission[0].dischargeDate, 'yyyy-MM-dd', 'en-US') : null;
      this.updateAdmissionForm.patchValue({
        id: admission[0].id,
        patientId: admission[0].patientId,
        doctorId: admission[0].doctorId,
        wardId: admission[0].wardId,
        wardNumber: admission[0].wardNumber,
        admissionDate: formattedAdmissionDate,
        dischargeDate: formattedDischargeDate
      });
    });
  }

  onSubmit(): void {
    if (this.updateAdmissionForm.valid) {
      this.admissionService.UpdateAdmission(this.updateAdmissionForm.value).subscribe((response) => {
        this.router.navigate(['/secure/admission/get-admission']);
      }, (error) => {
        console.error('Error updating admission:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
