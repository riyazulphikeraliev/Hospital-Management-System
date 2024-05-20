import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/abstracts/component-base';
import { WardService } from '../../Service/ward.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ward',
  templateUrl: './add-ward.component.html',
  styleUrls: ['./add-ward.component.scss']
})
export class AddWardComponent extends ComponentBase {

  addWardForm!: FormGroup;


  override initVariables(): void {
    this.addWardForm = this.formBuilder.group({
      wardType: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      currentOccupancy: [0]
    });
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }

  constructor(private formBuilder: FormBuilder,
    private wardService: WardService,
    private router: Router) {super() }

// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
override ngOnInit(): void {
  this.initVariables()
  this.subscribeEvents()
  this.load()
  
}
onSubmit(): void {
  if (this.addWardForm.valid) {
    this.wardService.addWard(this.addWardForm.value).subscribe(
      () => {
        this.router.navigate(['/secure/Ward/get-ward']);
      },
      (error: any) => {
        console.error('Error adding ward:', error);
      }
    );
  } else {
    console.error('Form is invalid');
  }
}
}
