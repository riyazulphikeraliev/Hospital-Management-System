import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-get-admin',
  templateUrl: './get-admin.component.html',
  styleUrls: ['./get-admin.component.scss']
})
export class GetAdminComponent extends ComponentBase {
  searchText: string = '';
  searchOption: string = '';
  admins: any[] = [];
  adminId!: number ;
  override initVariables(): void {

    this.adminService.getAdmin().subscribe(
      (data: any) => {
        this.admins = data;
      },
      (error: any) => {
        console.error(error);
      }
    );  }
    setId(id: number): void {
      this.adminId = id;
    }
    delete(): void {
      this.adminService.deleteAdmin(this.adminId).subscribe(()=>
        location.reload())
    }
    search(){}
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor(private adminService: AdminService) {super() }

 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 override ngOnInit(): void {
  this.initVariables()
  }

}
