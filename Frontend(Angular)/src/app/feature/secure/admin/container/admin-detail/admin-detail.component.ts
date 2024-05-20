import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent extends ComponentBase {
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  admin:any;
  adminId!: number;
  confirmationModalVisible = false;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) {
    super();
    this.adminId = this.route.snapshot.params['id'];
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
  }

  initVariables(): void {
    this.adminService.getAdminById(this.adminId).subscribe((data: any) => {
      this.admin = data;
    });
  }

  editAdmin(): void {
    this.router.navigate(['secure/admin/edit-admin', this.adminId]);
  }

  deleteAdmin(): void {
    this.confirmationModalVisible = true;
  }

  confirmDelete(): void {
    this.confirmationModalVisible = false;
    this.adminService.deleteAdmin(this.adminId).subscribe((data: any) => {
      this.router.navigate(['secure/admin/get-admin']);
    });
  }

  cancelDelete(): void {
    this.confirmationModalVisible = false;
  }

}
