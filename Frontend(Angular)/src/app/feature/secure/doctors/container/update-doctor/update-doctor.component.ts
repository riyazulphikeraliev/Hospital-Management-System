import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDoctor } from 'src/app/feature/shared/models/doctor.model';
import { DoctorService } from '../../Services/doctor.service';
import { ComponentBase } from '@shared/abstracts/component-base';
import { formatDate } from '@angular/common';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.scss'],
})
export class UpdateDoctorComponent extends ComponentBase {
  showUsernameAndPassword: boolean = false;
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
  doctorId!: number;
  userId!:number;
  updateForm!: FormGroup;
  Specializations!:any[];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private authService:AuthService
  ) { super();
    const urlSegments = this.router.url.split('/');
    if (urlSegments.includes('update-doc')) {
      this.route.params.subscribe(params => {
        this.doctorId = params['id'];
      });
    } else {
      this.userId = this.authService.getLocalStorageDetails().userId;
      if (this.userId) {
       this.doctorService.getDoctorByUserId(this.userId).subscribe((data)=>{
        this.doctorId=data[0].id
        this.getDoctorDetails()
       })
      }
    }
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    this.initVariables();
    this.createForm();
    this.getDoctorDetails()
  }

  createForm() {
    this.updateForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      specializationID: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      dateOfBirth:new FormControl('',Validators.required),
      imagePath:new FormControl('',Validators.required),
      username : new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  }

  getDoctorDetails() {
    this.doctorService.getDoctorById(this.doctorId).subscribe((data: any) => {
      const formattedDob= data[0].dateOfBirth ? formatDate(data[0].dateOfBirth, 'yyyy-MM-dd', 'en-US') : null;  
          this.updateForm.setValue({
        Id: data[0].id,
        firstName: data[0].firstName,
        lastName: data[0].lastName,
        specializationID: data[0].specializationId,
        contactNumber: data[0].contactNumber,
        email: data[0].email,
        address: data[0].address,
        dateOfBirth:formattedDob,
        imagePath:data[0].imagePath,
        username:data[0].userName,
        password:data[0].password
      });
    });
  }

  updateDoctor() {
    if (this.updateForm.valid) {
      this.doctorService.updateDoctor(this.updateForm.value).subscribe((data: any) => {

        const currentUrl = this.router.url;

        if (currentUrl.includes('/secure/doctors')) {
          this.router.navigate(['/viewdoc', this.doctorId]);
        } else if (currentUrl.includes('/secure/profile/updateDoctor')) {
       
          this.router.navigate(['/secure/profile']);
        } else {
          this.router.navigate(['/']);
        }
      });
    } else {
    }
  }
}
