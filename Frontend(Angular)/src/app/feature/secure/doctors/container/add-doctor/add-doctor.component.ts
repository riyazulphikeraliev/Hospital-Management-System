import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentBase } from '@shared/abstracts/component-base';
import { DoctorService } from '../../Services/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent extends ComponentBase {

  AddDocForm!:FormGroup;
  Specializations!:any[];
  constructor(private doctorService:DoctorService,private router:Router) { super();}
  override initVariables(): void {

    this.doctorService.getSpecialization().subscribe((data) => {
      this.Specializations = data;
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
    this.initVariables();
    this.initForm()   
           
  }
  initForm(): void {

    this.AddDocForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      specializationID: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      dateOfBirth:new FormControl('',Validators.required),
      imagePath:new FormControl(''),
      username : new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  }
  onSubmit(): void {
    if (this.AddDocForm.valid) {    
      this.doctorService.addDoctor(this.AddDocForm.value).subscribe(() =>{this.router.navigate(['getdoc']) })
      
    } else {    
      console.error('Form is invalid');
    }
  }

  ToDoctorList(){
this.router.navigate(['getdoc'])
  }



}
