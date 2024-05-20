import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { WardService } from '../../Service/ward.service';

@Component({
  selector: 'app-get-wards',
  templateUrl: './get-wards.component.html',
  styleUrls: ['./get-wards.component.scss']
})
export class GetWardsComponent extends ComponentBase{

  searchText: string = '';
  searchOption: string = '';
  wards: any[] = [];
  wardId!: number;
  override initVariables(): void {
  }
  override subscribeEvents(): void {
    this.wardService.getWards().subscribe((wards: any) => {
      this.wards = wards;
    });
  }
  override load(): void {
  }
  override unload(): void {
  }

  setId(wardId: number): void {
    this.wardId = wardId;
  }

  delete(): void {
    this.wardService.deleteWard(this.wardId).subscribe(() => {
      location.reload();
    });
  }

  search(){
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.wardService.getward(queryParams).subscribe(
      (res:any) => {
        this.wards = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  constructor( private wardService: WardService,
    private router: Router) {super() }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables()
    this.subscribeEvents()

    this.load()
  }

}
