import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { SpecializationService } from '../../Service/specialization.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-get-specialization',
  templateUrl: './get-specialization.component.html',
  styleUrls: ['./get-specialization.component.scss']
})
export class GetSpecializationComponent extends ComponentBase{
  specializations: any[] = [];
  specializationForm!: FormGroup;
  showAddForm:boolean=false;
  searchText: string = '';
  searchOption: string = '';
  errorMessage: string = '';
  SpecId!:number

  override initVariables(): void {
    this.specializationService.getSpec().subscribe(
      (data) => {
        this.specializations = data;
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Failed to fetch specializations.';
      }
    );

    this.specializationForm = this.fb.group({
      specializationName: ['', Validators.required],
      imagePath: ['', Validators.required]
    });
  }
  cancelAdd(){
this.showAddForm=false;
  }
  addSpecialization() {
    this.showAddForm=true;
  }
  override subscribeEvents(): void {
   
  }
  override load(): void {
  }
  override unload(): void {
  }
  setId(specializationId: number): void {
  this.SpecId=specializationId
  }
  delete(): void {
this.specializationService.deleteSpec(this.SpecId).subscribe(
  ()=>{
    location.reload()
  }
)  }
  search(): void {
    const queryParams: any = {};
    if (this.searchText) {
      queryParams[this.searchOption] = this.searchText;
    }
    this.specializationService.getSpecs(queryParams).subscribe(
      (res: any[]) => {
        this.specializations = res;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No specializations found with the specified criteria.';
        console.error(error);
      }
    );
  }
  constructor(private fb: FormBuilder,private specializationService: SpecializationService, private router: Router) {super() }

 
  onSubmit(): void {
    if (this.specializationForm.valid) {
      this.specializationService.addSpec(this.specializationForm.value).subscribe(
        (response) => {
          this.specializationForm.reset();
          location.reload()
        },
        (error) => {
          console.error('Error adding specialization:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
