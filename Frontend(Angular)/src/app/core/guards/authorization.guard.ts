import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivateChild {
role:any;
userId:any;
  constructor(
    private router: Router,private authService:AuthService
  ) { this.role=(authService.getLocalStorageDetails()||'{}').roleName;
this.userId=(authService.getLocalStorageDetails()||'{}').userId;
console.log("user id is ",this.userId ,"and ","role nae is ",this.role)  }
 
  private checkGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {
    if (!this.isAuthorized(state)) {
      this.router.navigate(['/Unauth']);
      return of(false);
    } else {
      return of(true);
    }
  }

  private isAuthorized(state: RouterStateSnapshot): boolean {
    const url = state.url;
  
    if (
      (url.includes("secure/admin/admin-usermgmt") ||
        url.includes("secure/admin/admin-servicemgmt") ||
        url.includes("secure/admin/get-admin") ||
        url.includes("secure/admin/add-admin") ||
        url.includes("secure/admin/view-admin/:id") ||
        url.includes("secure/admin/update-admin/:id") ||
        url.includes("secure/doctors/add-doc") ||
        url.includes("secure/doctors/update-doc/:id") ||
        url.includes("secure/patients/get-patient") ||
        url.includes("secure/patients/patientdetail/:id") ||
        url.includes("secure/patients/edit-patient/:id") ||
        url.includes("secure/patients/add-patient") ||
        url.includes("secure/staff/add-staff") ||
        url.includes("secure/staff/update-staff/:id") ||
        url.includes("secure/staff/get-staff") ||
        url.includes("secure/admission/get-admission") ||
        url.includes("secure/admission/update-admission/:id") || 
        url.includes("secure/admission/add-admission") ||
        url.includes("secure/BookAppointment/get-appointment") ||
        url.includes("secure/BookAppointment/update-appointment/:id") ||
        url.includes("secure/patientBill/get-PB") ||
        url.includes("secure/patientBill/add-PB") ||
        url.includes("secure/patientBill/update-PB/:id") ||
        url.includes("secure/MedicalRecord/get-MR") ||
        url.includes("secure/MedicalRecord/add-MR") ||
        url.includes("secure/MedicalRecord/update-MR/:id") ||
        url.includes("secure/Specialization/get-spec") ||
        url.includes("secure/Specialization/update-spec/:id") ||
        url.includes("secure/Ward/get-ward") ||
        url.includes("secure/Ward/add-ward") ||
        url.includes("secure/Ward/update-ward/:id")) &&
      this.role === 'Patient'
    ) {
      return false;
    } else if (
      (url.includes("secure/admin/admin-usermgmt") ||
        url.includes("secure/admin/admin-servicemgmt") ||
        url.includes("secure/admin/get-admin") ||
        url.includes("secure/admin/add-admin") ||
        url.includes("secure/admin/view-admin/:id") ||
        url.includes("secure/admin/update-admin/:id") ||
        url.includes("secure/doctors/add-doc") ||
        url.includes("secure/patients/edit-patient/:id") ||
        url.includes("secure/patients/add-patient") ||
        url.includes("secure/staff/add-staff") ||
        url.includes("secure/staff/update-staff/:id") ||
        url.includes("secure/staff/get-staff") ||
        url.includes("secure/admission/get-admission") ||
        url.includes("secure/admission/update-admission/:id") ||
        url.includes("secure/admission/add-admission") ||
        url.includes("secure/BookAppointment/get-appointment") ||
        url.includes("secure/BookAppointment/update-appointment/:id") ||
        url.includes("secure/patientBill/get-PB") ||
        url.includes("secure/patientBill/add-PB") ||
        url.includes("secure/patientBill/update-PB/:id") ||
        url.includes("secure/Specialization/get-spec") ||
        url.includes("secure/Specialization/update-spec/:id") ||
        url.includes("secure/Ward/get-ward") ||
        url.includes("secure/Ward/add-ward") ||
        url.includes("secure/Ward/update-ward/:id")) &&
      this.role === 'Doctor'
    ) {
      return false;
    }else if((url.includes("secure/admin/update-admin/1")||url.includes("secure/admin/view-admin/1")|| url.includes("secure/admin/get-admin"))&& this.userId!==1  ){
      return false;
    }
    
    else {
      return true;
    }
  }
  
 

  canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {
    return this.checkGuard(activatedRouteSnapshot, state);
  }
}
