import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { PatientService } from '../../Service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from '../../model/patient.model';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent extends ComponentBase {


  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
  patients: IPatient[] = [];
  patientId!: number;
  confirmationModalVisible = false;
  patientBill!:any;
  PatientAppointment!:any;
  paitentMedicalRecord!:any;

  constructor(private patientService: PatientService, private route: ActivatedRoute, private router: Router) { 
    super();
    this.patientId = this.route.snapshot.params['id'];
  }

 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 override ngOnInit(): void {
    this.initVariables();
    this.GetPatientBill();
    this.GetPatientMR();
    this.GetPatientAppointment();
  }

  override initVariables(): void {
    this.patientService.getPatientById(this.patientId).subscribe((data: IPatient[]) => {
      console.log(data);
      this.patients = data; 
    });
  }

  editPatient(): void {
    this.router.navigate(['secure/patients/edit-patient', this.patientId]);
  }

  deletePatient(): void {
    this.confirmationModalVisible = true;
  }

  confirmDelete(): void {
    this.confirmationModalVisible = false;
    this.patientService.deletePatient(this.patientId).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['secure/patients/get-patient']);
    });
  }

  cancelDelete(): void {
    this.confirmationModalVisible = false;
  }

  viewmedicalrecord(): void {
    
  }

GetPatientBill(){
  this.patientService.GetBillByPatienId(this.patientId).subscribe((data)=>{
    this.patientBill=data
    console.log(this.patientBill)
  })
}

GetPatientMR(){
  this.patientService.GetMRBypatientId(this.patientId).subscribe((data)=>{
    this.paitentMedicalRecord=data
    console.log(this.paitentMedicalRecord)
  })
}
GetPatientAppointment(){
  this.patientService.GetAppointmentsByPatientId(this.patientId).subscribe((data)=>{
    this.PatientAppointment=data;
    console.log(this.PatientAppointment)
  })
}


 

}
