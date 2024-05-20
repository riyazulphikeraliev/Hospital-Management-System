import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../Service/patient.service';
import { ComponentBase } from '@shared/abstracts/component-base';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent extends ComponentBase {
  override initVariables(): void {
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  AddPatientForm!: FormGroup;


  constructor(private patientService: PatientService, private router: Router, private sanitizer: DomSanitizer) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.AddPatientForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      imagePath:new FormControl(''),
      username: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.AddPatientForm.valid) {
      this.patientService.addPatient(this.AddPatientForm.value).subscribe(() => {
        this.router.navigate(['/secure/patients/get-patient']);
      });
    } else {
      console.error('Form is invalid');
    }
  }
 
}
