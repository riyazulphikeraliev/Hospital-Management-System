import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { SpecializationService } from '../../Service/specialization.service';

@Component({
  selector: 'app-update-specialization',
  templateUrl: './update-specialization.component.html',
  styleUrls: ['./update-specialization.component.scss']
})
export class UpdateSpecializationComponent extends ComponentBase
{
  override initVariables(): void {
    this.specializationForm = this.formBuilder.group({
      id:[],
      specializationName: ['', Validators.required],
      imagePath: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.specializationId = +params['id'];
      this.specializationService.getSpecById(this.specializationId).subscribe(specialization => {
        this.specializationForm.patchValue({
          id: specialization[0].id,
          specializationName: specialization[0].specializationName,
          imagePath: specialization[0].imagePath
        });
      });
    });
  }
  override subscribeEvents(): void {
  }
  override load(): void {
  }
  override unload(): void {
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables()
  }

  specializationForm!: FormGroup;
  specializationId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private specializationService: SpecializationService
  ) { super()}

  onSubmit(): void {
    if (this.specializationForm.valid) {
      const updatedSpecialization = this.specializationForm.value;
      this.specializationService.updateSpec(updatedSpecialization).subscribe(() => {
        this.router.navigate(['secure/Specialization/get-spec']);
      }, error => {
        console.error('Error updating specialization:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
