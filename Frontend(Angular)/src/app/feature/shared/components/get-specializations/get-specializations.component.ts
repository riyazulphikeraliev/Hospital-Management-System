import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { GetListService } from '../../service/get-list.service';

@Component({
  selector: 'app-get-specializations',
  templateUrl: './get-specializations.component.html',
  styleUrls: ['./get-specializations.component.scss']
})
export class GetSpecializationsComponent extends ComponentBase {
  specializations:any[]= [];
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
  
  }
  override initVariables(): void {
    this.getlistService.getSpecialization().subscribe(res=>{
      this.specializations=res;
    })
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor(private getlistService:GetListService) {super() }



}
