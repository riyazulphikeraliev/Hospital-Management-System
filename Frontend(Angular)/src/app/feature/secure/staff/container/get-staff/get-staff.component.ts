import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { IStaff } from '../../models/Staff.model';
import { StaffService } from '../../Service/staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-staff',
  templateUrl: './get-staff.component.html',
  styleUrls: ['./get-staff.component.scss']
})
export class GetStaffComponent extends ComponentBase{

  isDeleteModalVisible: boolean = true;
  staffList: IStaff[] = [];
  searchText: string = '';
  searchOption: string = '';
  staffid!:number;
  
  constructor(private staffService:StaffService,private router:Router,private route:ActivatedRoute) { super();
    console.log(this.isDeleteModalVisible)
  }

  override initVariables(): void {
  }
  override subscribeEvents(): void {
    this.staffService.getStaffList().subscribe(
      (data: IStaff[]) => {
        this.staffList = data;
      },
      (error: any) => {
        console.error('Error fetching staff:', error);
      }
    );
  }
  override load(): void {
  }
  override unload(): void {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables()
    this.subscribeEvents();
  }

search():void{
  const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.staffService.getStaff(queryParams).subscribe(
      (res) => {
        this.staffList = res;
       
      },
      (error) => {
        console.error(error);
      }
    );
}

setId(staffId: number){
  this.staffid=staffId;
}

delete(){
  this.staffService.deleteStaff(this.staffid).subscribe();
location.reload()}
}
