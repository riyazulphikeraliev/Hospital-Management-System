import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { MedicalRecordService } from '../../Service/medical-record.service';
import { IMedicalRecord } from '../../Model/medicalRecord.model';

@Component({
  selector: 'app-get-medical-record',
  templateUrl: './get-medical-record.component.html',
  styleUrls: ['./get-medical-record.component.scss']
})
export class GetMedicalRecordComponent extends ComponentBase {
  medicalRecords: IMedicalRecord[] = [];
  searchText: string = '';
  searchOption: string = '';
  recordId: number = 0;

  constructor(private medicalRecordService: MedicalRecordService) { super(); }

  override initVariables(): void {
  }

  override subscribeEvents(): void {
    this.medicalRecordService.getMRs().subscribe((data: IMedicalRecord[]) => {
      this.medicalRecords = data;
    });
  }

  override load(): void {
  }

  override unload(): void {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    this.load();
  }

  search(): void {
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.medicalRecordService.getMR(queryParams).subscribe(
      (res:any) => {
        this.medicalRecords = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setId(recordId: number): void {
    this.recordId = recordId;
  }

  delete(): void {
    this.medicalRecordService.deleteMR(this.recordId).subscribe(() => {
      location.reload(); 
    });
  }
}
