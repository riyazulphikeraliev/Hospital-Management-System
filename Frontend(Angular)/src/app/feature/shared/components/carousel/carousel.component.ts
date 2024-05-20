import { Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';

interface CarouselImage{
  imageSrc:string;
  imageAlt:string;
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent extends ComponentBase {

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
