import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent extends ComponentBase{
  override initVariables(): void {
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor() { super()}

}
