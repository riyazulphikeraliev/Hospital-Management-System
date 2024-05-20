import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ValidationError } from './validation-error.model';

@Component({
  selector: 'nggt-validation-sheet',
  templateUrl: './validation-sheet.component.html',
  styleUrls: ['./validation-sheet.component.scss']
})
export class ValidationSheetComponent {

  form: FormGroup;
  messages: any;
  errors: ValidationError[] = [];

  constructor(
    private sheetRef: MatBottomSheetRef<ValidationSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.form = data.formGroup;
    this.messages = data.validationMessages;
    this.composer();
  }

  /* Public Methods */
  onItemClick(error: any): void {
    this.sheetRef.dismiss(error);
  }

  /* private Methods */
  private composer(): void {
    this.iterator(this.form, null);
  }

  private iterator(form: any, parent: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field] as FormControl | FormGroup | FormArray;
      if (control instanceof FormControl) {
        if (control.status === 'INVALID') {
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              const error = {} as ValidationError;
              error.field = parent ? `${parent}.${field}` : field;
              error.text = parent ? this.messages[parent][field][key] : this.messages[field][key];
              this.errors.push(error);
            }
          }
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.iterator(control, field);
      } else {

      }
    });
  }
}
