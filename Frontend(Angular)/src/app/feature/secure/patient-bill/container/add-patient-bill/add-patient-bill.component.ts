import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { PatientBillService } from '../../Service/patient-bill.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient-bill',
  templateUrl: './add-patient-bill.component.html',
  styleUrls: ['./add-patient-bill.component.scss']
})
export class AddPatientBillComponent extends ComponentBase{

  addPatientBillForm!: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  override initVariables(): void {
    this.addPatientBillForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      billDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paymentStatus: ['Pending', Validators.required]
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
  override load(): void {
  }
  override unload(): void {
  }

  constructor( private formBuilder: FormBuilder, 
    private patientBillService: PatientBillService,
    private router: Router) { super()}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables()
    this.subscribeEvents()
    this.load()
  }

  onSubmit(){

    if (this.addPatientBillForm.valid) {
      this.patientBillService.addBill(this.addPatientBillForm.value).subscribe(
        () => {
          this.router.navigate(['/secure/patientBill/get-PB']);
        },
        (error: any) => {
          console.error('Error adding patient bill:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }

  }
}
