import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../Service/patient.service';
import { Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';

@Component({
  selector: 'app-get-patients',
  templateUrl: './get-patients.component.html',
  styleUrls: ['./get-patients.component.scss']
})
export class GetPatientsComponent extends ComponentBase {

  patients: any[] = [];
  searchText: any = '';
  searchOption: string = '';
  errorMessage: string = '';

  constructor(private patientService: PatientService, private router: Router) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
  }

  initVariables(): void {
    this.patientService.getPatients().subscribe(
      (val) => {
        this.patients = val;
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to fetch patients.';
      }
    );
  }

  subscribeEvents(): void {}

  load(): void {}

  unload(): void {}

  AddPatient(): void {
    this.router.navigate(['secure/patients/add-patient']);
  }

  viewPatientProfile(patientId: number): void {
    this.router.navigate(['view-patient', patientId]);
  }

  search(): void {
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.patientService.getPatient(queryParams).subscribe(
      (res) => {
        this.patients = res;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No patients found with the specified criteria.';
        console.error(error);
      }
    );
  }

}
