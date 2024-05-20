import { Component, } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdmission } from '../../Models/Admission.model';
import { AdmissionService } from '../../Service/admission.service';

@Component({
  selector: 'app-get-admission',
  templateUrl: './get-admission.component.html',
  styleUrls: ['./get-admission.component.scss']
})
export class GetAdmissionComponent extends ComponentBase{

  isDeleteModalVisible: boolean = true;
  admissionList: IAdmission[] = [];
  searchText: string = '';
  searchOption: string = '';
  admissionId!: number;
  
  constructor(private admissionService: AdmissionService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  override initVariables(): void {
  }

  override subscribeEvents(): void {
    this.admissionService.getAdmissionList().subscribe(
      (data: IAdmission[]) => {
        this.admissionList = data;
      },
      (error: any) => {
        console.error('Error fetching admissions:', error);
      }
    );
  }

  override load(): void {
  }

  override unload(): void {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.subscribeEvents();
    
  }

  search(): void {
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.admissionService.getAdmission(queryParams).subscribe(
      (res:any) => {
        this.admissionList = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setId(admissionId: number): void {
    this.admissionId = admissionId;
  }

  delete(): void {
    this.admissionService.deleteAdmission(this.admissionId).subscribe(() => {
      location.reload()
    });
  }
}
