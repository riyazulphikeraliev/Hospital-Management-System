import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../secure/patients/Service/patient.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private patientService:PatientService,
    private router: Router
  ) { }

  
  register(user:any):void{
    this.patientService.addPatient(user)
    .subscribe((x) => {
      this.router.navigate(['/login']);
    });
  }
}
