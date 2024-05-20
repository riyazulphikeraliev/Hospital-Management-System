import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent extends ComponentBase {
  filteredDoctors: any[] = [];
  searchText: string = '';
  getRoles!: string;
  userId!: number;
  admin!: any;
  doctor!: any;
  patient!: any;
  firstName!: string;
  lastName!:string;
  userImage!:string


  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
  }

  override initVariables(): void {
    
    if(this.isLoggedIn()){
      this.getRoles = this.getRole();
      this.userId = this.getUserId();

      if (this.getRoles === 'Admin') {
        this.getlistService.getAdminByUserId(this.userId).subscribe((data) => {
          this.admin = data[0];
          this.firstName = data[0].firstName
          this.lastName = data[0].lastName;
          this.userImage=data[0].imagePath
  
        });
      } else if (this.getRoles === 'Doctor') {
        this.getlistService.getDoctorByUserId(this.userId).subscribe((data) => {
          this.doctor = data[0];
          this.firstName = data[0].firstName
          this.lastName = data[0].lastName;
          this.userImage=data[0].imagePath
  
  
        });
      } else if (this.getRoles === 'Patient') {
        this.getlistService.getPatientByUserId(this.userId).subscribe((data) => {
          this.patient = data[0];
          this.firstName = data[0].firstName
          this.lastName = data[0].lastName;
          this.userImage=data[0].imagePath
  
  
        });
      } else {
        return;
      }
    }
  }

  override subscribeEvents(): void {}
  override load(): void {}
  override unload(): void {}

  constructor(
    private authService: AuthService,
    private getlistService: GetListService
  ) {
    super();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getRole(): string {
    return (this.getRoles = this.authService.getLocalStorageDetails().roleName);
  }

  logout(): void {
    this.authService.logout();
  }
  getUserId(): number {
    return (this.userId = this.authService.getLocalStorageDetails().userId);
  }
}
