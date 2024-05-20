import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctor } from '../../models/doctor.model';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.scss']
})
export class ViewDoctorComponent extends ComponentBase implements OnInit {
  doctors: IDoctor[] = [];
  docid!: number;
  confirmationModalVisible = false;
  getRoles!:string;

  constructor(private getlistService: GetListService, private route: ActivatedRoute,private router:Router,private authService:AuthService) { 
    super();
    this.docid = this.route.snapshot.params['id'];
  }

  override ngOnInit(): void {
    this.initVariables();
  }

  isLoggedIn():boolean{
    return this.authService.isLoggedIn()
  }
  getRole():string{
    if(this.isLoggedIn()){
      this.getRoles=this.authService.getLocalStorageDetails().roleName
    }
    return this.getRoles
  }

  override initVariables(): void {
    
    this.getlistService.getDoctorById(this.docid).subscribe((data: IDoctor[]) => {
      this.doctors = data; 
    });
  }
  editDoctor(){
this.router.navigate(['secure/doctors/update-doc',this.docid])
  }
  deleteDoctor(){
    this.confirmationModalVisible = true;
  }
  confirmDelete() {
    this.confirmationModalVisible = false;
    this.getlistService.deleteDoctor(this.docid).subscribe((data: any) => {
      this.router.navigate(['getdoc']);
    });
  }

  cancelDelete() {
    this.confirmationModalVisible = false;
  }
  scheduleAppointment(){

  }
  bookAppointment(){

  }
  override subscribeEvents(): void {}

  override load(): void {}

  override unload(): void {}
}
