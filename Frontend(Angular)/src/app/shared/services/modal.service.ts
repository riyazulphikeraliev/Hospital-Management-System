import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMatModalService } from '@vslabs/ngx-mat-modal';
import { ConfirmModalData } from '@vslabs/ngx-mat-modal/lib/models/confirm-modal-data.model';
import { MessageModalData } from '@vslabs/ngx-mat-modal/lib/models/message-modal-data.model';
import { Observable } from 'rxjs';
import { ValidationSheetComponent } from '../components/validation-sheet/validation-sheet.component';

@Injectable()
export class ModalService {

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private ngxMatModalService: NgxMatModalService
  ) { }

  /* Public Methods */
  setDialogConfig(disableClose: boolean, autoFocus: boolean, width: string, data: any = null, panelClass: string = ''): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.autoFocus = autoFocus;
    dialogConfig.width = width;
    dialogConfig.data = data;
    dialogConfig.panelClass = panelClass;
    return dialogConfig;
  }

  showMessage(message: string, title: string = ''): Observable<boolean> {
    const dialogConfig = this.setDialogConfig(true, false, 'auto', message);
    const data: MessageModalData = {
      title,
      message
    };
    return this.ngxMatModalService.showMessage(data, dialogConfig);
  }

  confirm(data: ConfirmModalData): Observable<boolean> {
    return this.ngxMatModalService.confirm({
      question: 'Are you sure?',
      confirmBtnText: 'Yes',
      cancelBtnText: 'No'
    });
  }

  /*
  * message: message to be displayed
  * action: label of button
  */
  showNotification(message: string, action: string = 'OK', duration: number = 4000): void {
    this.snackBar.open(message, action, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration,
    });
  }

  showValidationSheet(formGroup: FormGroup, validationMessages: any): MatBottomSheetRef {
    return this.bottomSheet.open(ValidationSheetComponent, {
      data: { formGroup, validationMessages },
    });
  }
}
