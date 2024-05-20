import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { IPatientBill } from '../../Model/patient-bill.model';
import { PatientBillService } from '../../Service/patient-bill.service';

@Component({
  selector: 'app-get-patient-bill',
  templateUrl: './get-patient-bill.component.html',
  styleUrls: ['./get-patient-bill.component.scss']
})
export class GetPatientBillComponent extends ComponentBase{
  override initVariables(): void {
  }
  override subscribeEvents(): void {
    this.patientBillService.getBills().subscribe((data:any)=>{
      
        this.patientBills = data;
     
    })
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor(private patientBillService: PatientBillService) {super() }

  searchText: string = '';
  searchOption: string = '';
  patientBills: IPatientBill[] = [];
  BillId!:number


  search(){
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.patientBillService.getBill(queryParams).subscribe(
      (res:any) => {
        this.patientBills = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setId(patientbill:number){
this.BillId=patientbill
  }

  delete(){
    this.patientBillService.deleteBill(this.BillId).subscribe(()=>
    {
      location.reload()
    })

  }

}

