import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-get-doctors',
  templateUrl: './get-doctors.component.html',
  styleUrls: ['./get-doctors.component.scss'],
})
export class GetDoctorsComponent extends ComponentBase implements OnInit {
  doctors: any[] = [];
  searchText: any = '';
  searchOption: string = '';
  errorMessage: string = '';
  getRoleName!:string
  constructor(private getlistService: GetListService,private router:Router,private authService:AuthService) {
    super();
  }

  getRole():string{
    if(this.authService.isLoggedIn()){
      this.getRoleName=this.authService.getLocalStorageDetails().roleName

    }
    return this.getRoleName
  }
  override ngOnInit(): void {
    this.initVariables();
  }

  override initVariables(): void {
    this.getlistService.getDoctor().subscribe((val) => {
      this.doctors = val;
    });
  }

  override subscribeEvents(): void {}

  override load(): void {}

  override unload(): void {}
  AddDoctor(){
    this.router.navigate(['secure/doctors/add-doc'])
  }
  viewDoctorProfile(doctorId: string) {
    this.router.navigate(['viewdoc', doctorId]);
  }

  search(): void {
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.getlistService.getDoctors(queryParams).subscribe(
      (res) => {
        this.doctors = res;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No doctors found with the specified criteria.';
        console.error(error);
      }
    );
  }
}
