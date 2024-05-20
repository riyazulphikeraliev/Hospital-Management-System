import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../Service/patient.service';
import { IPatient } from '../../model/patient.model';
import { formatDate } from '@angular/common';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent extends ComponentBase{
  override initVariables(): void {
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  updateForm!: FormGroup;
  patientId!: number;
  userId!:number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService, 
    private authservice:AuthService
  ) {super();
    const urlSegments = this.router.url.split('/');
    if (urlSegments.includes('edit-patient')) {
      this.route.params.subscribe(params => {
        this.patientId = params['id'];
      });
    } else {
      this.userId = this.authservice.getLocalStorageDetails().userId;
      if (this.userId) {
       this.patientService.getPatientByUserId(this.userId).subscribe((data)=>{
        this.patientId=data[0].id
        this.getPatientDetails()
       })
      }
    }
   }

 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 override  ngOnInit(): void {
    this.initForm();
    this.getPatientDetails();
  }

  initForm(): void {
    this.updateForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      imagePath:new FormControl('',Validators.required),
      username: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      
    });
  }

  getPatientDetails(): void {
    this.patientService.getPatientById(this.patientId).subscribe((patient: any) => {
      const formattedDateOfBirth = patient[0].dateOfBirth ? formatDate(patient[0].dateOfBirth, 'yyyy-MM-dd', 'en-US') : null;
      this.updateForm.patchValue({
        Id: patient[0].id,
        firstName: patient[0].firstName,
        lastName: patient[0].lastName,
        dateOfBirth: formattedDateOfBirth,
        gender: patient[0].gender,
        contactNumber: patient[0].contactNumber,
        email: patient[0].email,
        address: patient[0].address,
        imagePath:patient[0].imagePath,
        username: patient[0].userName,
        password:patient[0].password,
      });
    });
  }
  
  

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.patientService.updatePatient(this.updateForm.value).subscribe((data: any) => {
        const currentUrl = this.router.url;

        if (currentUrl.includes('/secure/patients')) {
          this.router.navigate(['/secure/patients/patientdetail', this.patientId]);
        } else if (currentUrl.includes('/secure/profile/updatePatient')) {
          this.router.navigate(['/secure/profile']);
          location.reload
        } else {
          this.router.navigate(['/']);
        }
      });
    } else {
    }
  }
}
