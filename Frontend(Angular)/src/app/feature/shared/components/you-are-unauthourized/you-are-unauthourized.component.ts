import { Component } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';

@Component({
  selector: 'app-you-are-unauthourized',
  templateUrl: './you-are-unauthourized.component.html',
  styleUrls: ['./you-are-unauthourized.component.scss']
})
export class YouAreUnauthourizedComponent extends ComponentBase {
  override initVariables(): void {
    throw new Error('Method not implemented.');
  }
  override subscribeEvents(): void {
    throw new Error('Method not implemented.');
  }
  override load(): void {
    throw new Error('Method not implemented.');
  }
  override unload(): void {
    throw new Error('Method not implemented.');
  }

  constructor() {super() }

 

}
