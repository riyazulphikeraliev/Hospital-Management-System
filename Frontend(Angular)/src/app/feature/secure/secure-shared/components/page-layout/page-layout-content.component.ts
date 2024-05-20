import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nggt-page-layout-content',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutContentComponent { }
