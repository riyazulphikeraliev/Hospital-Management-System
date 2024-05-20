import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentBase } from '@shared/abstracts/component-base';
import { ProfileService } from '../../services';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent extends ComponentBase {
  @Input() username: string = '';

  changePasswordForm: FormGroup;
  oldPasswordIncorrect: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService
  ) {
    super();
    this.username = this.data.username; // Assign username from MAT_DIALOG_DATA
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  override initVariables(): void {}
  override subscribeEvents(): void {}
  override load(): void {}
  override unload(): void {}

  submitForm(): void {
    if (this.changePasswordForm.valid) {
      const oldPassword = this.changePasswordForm.get('oldPassword')!.value;
      const newPassword = this.changePasswordForm.get('newPassword')!.value;

      const requestData = {
        userName: this.username,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      this.profileService.ChangeUserPassword(requestData).subscribe(
        (response) => {

          console.log('Password change successful:', response);
          this.changePasswordForm.reset();
          this.dialogRef.close();
        },

        (error) => {
          console.error('Error changing password:', error);
        }
      );
    }
  }
}
