/**
 * To only allow decimal numbers in input field.
 * @author Vishnu Somanath
 * @version 1.0.0
 * @return {void}
 * @example
 * <div [nggtBackButton]><div />
 */
import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[nggtBackButton]'
})
export class BackButtonDirective {

  constructor(
    private location: Location
  ) { }

  @HostListener('click') onClick(): void {
    this.location.back();
  }
}
