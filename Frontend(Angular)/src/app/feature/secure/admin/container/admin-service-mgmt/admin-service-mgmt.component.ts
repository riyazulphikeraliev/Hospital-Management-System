import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';

@Component({
  selector: 'app-admin-service-mgmt',
  templateUrl: './admin-service-mgmt.component.html',
  styleUrls: ['./admin-service-mgmt.component.scss']
})
export class AdminServiceMgmtComponent extends ComponentBase {
  override initVariables(): void {
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor() {super() }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override  ngOnInit(): void {
    this.initVariables()
  }



}
