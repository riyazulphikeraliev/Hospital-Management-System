import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';

@Component({
  selector: 'app-spec-doc',
  templateUrl: './spec-doc.component.html',
  styleUrls: ['./spec-doc.component.scss']
})
export class SpecDocComponent extends ComponentBase{
  specId!:number;
  doctors!: any[];
  override initVariables(): void {
    this.getlistService.getDoctorbySpec(this.specId).subscribe((val) => {
      this.doctors = val;
    });
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor(private router:Router,private getlistService:GetListService,private route:ActivatedRoute) {super() ;
    this.specId=this.route.snapshot.params['id'];
    this.initVariables()
  }

 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 override ngOnInit(): void {
  this.initVariables()
  }
  viewDoctorProfile(doctorId:number){
    this.router.navigate(['viewdoc', doctorId]);
  }

}
