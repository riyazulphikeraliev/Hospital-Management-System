import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { WardService } from '../../Service/ward.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-update-ward',
  templateUrl: './update-ward.component.html',
  styleUrls: ['./update-ward.component.scss']
})
export class UpdateWardComponent extends ComponentBase {

  updateWardForm!: FormGroup;
  wardId!: number;

  override initVariables(): void {
    this.updateWardForm = this.formBuilder.group({
      id: ['', Validators.required],
      wardType: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      currentOccupancy: ['',Validators.required]
    });
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
  getWardDetails(): void {
    this.wardId = this.route.snapshot.params['id'];
    this.wardService.getWardById(this.wardId).subscribe(
      (ward: any) => {
        this.updateWardForm.patchValue({
          id:ward[0].id,
          wardType: ward[0].wardType,
          capacity: ward[0].capacity,
          currentOccupancy:ward[0].currentOccupancy
        });
      },
      (error: any) => {
        console.error('Error fetching ward details:', error);
      }
    );
  }
  constructor(private formBuilder: FormBuilder,
    private wardService: WardService,
    private route: ActivatedRoute,
    private router: Router) { super()}

 // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
 override ngOnInit(): void {
  this.initVariables()
  this.getWardDetails()
  }

  onSubmit(): void {
    if (this.updateWardForm.valid) {
      this.wardService.UpdateWard( this.updateWardForm.value).subscribe(
        () => {
          this.router.navigate(['/secure/Ward/get-ward']);
        },
        (error: any) => {
          console.error('Error updating ward:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
