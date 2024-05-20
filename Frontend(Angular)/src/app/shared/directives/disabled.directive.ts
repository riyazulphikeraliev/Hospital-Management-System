/**
 * To drag drop file inputs.
 * @author Vishnu Somanath
 * @version 1.0.0
 * @return {void}
 * @example
 * <div  nggtControlDisabled="true" />
 */
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[nggtControlDisabled]'
})
export class DisabledDirective {

  @Input() set nggtControlDisabled(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    if (this.ngControl?.control) {
      this.ngControl.control[action]();
    }
  }

  constructor(
    private ngControl: NgControl
  ) { }

}
