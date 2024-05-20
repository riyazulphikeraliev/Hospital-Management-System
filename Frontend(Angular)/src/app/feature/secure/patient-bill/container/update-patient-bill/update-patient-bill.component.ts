import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { formatDate } from '@angular/common';
import { PatientBillService } from '../../Service/patient-bill.service';

@Component({
  selector: 'app-update-patient-bill',
  templateUrl: './update-patient-bill.component.html',
  styleUrls: ['./update-patient-bill.component.scss']
})
export class UpdatePatientBillComponent extends ComponentBase{
  updatePatientBillForm!: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  patientBillId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private patientBillService: PatientBillService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.patientBillId = this.route.snapshot.params['id'];
  }

  override initVariables(): void {
    this.updatePatientBillForm = this.formBuilder.group({
      id: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      billDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paymentStatus: ['', Validators.required]
    });
  }

  override subscribeEvents(): void {
    this.patientBillService.getPatients().subscribe((patients: any) => {
      this.patients = patients;
    });
    this.patientBillService.getDoctors().subscribe((doctors: any) => {
      this.doctors = doctors;
    });
  }

  override load(): void {}

  override unload(): void {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.getPatientBillDetails()
  }

 

  getPatientBillDetails(): void {
    this.patientBillService.getBillById(this.patientBillId).subscribe((patientBill: any) => {
      const formattedBillDate = patientBill[0].billDate ? formatDate(patientBill[0].billDate, 'yyyy-MM-dd', 'en-US') : null;
      this.updatePatientBillForm.patchValue({
        id: patientBill[0].id,
        patientId: patientBill[0].patientId,
        doctorId: patientBill[0].doctorId,
        billDate: formattedBillDate,
        totalAmount: patientBill[0].totalAmount,
        paymentStatus: patientBill[0].paymentStatus
      });
    });
  }

  onSubmit(): void {
    if (this.updatePatientBillForm.valid) {
      this.patientBillService.updateBill(this.updatePatientBillForm.value).subscribe(
        () => {
          this.router.navigate(['/secure/patientBill/get-PB']);
        },
        (error: any) => {
          console.error('Error updating patient bill:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
