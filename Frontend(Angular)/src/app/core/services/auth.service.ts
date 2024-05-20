/**
 * @author Vishnu Somanath
 * @version 1.0.0
 * @return {void}
 * @example
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAPI } from '@shared/constants/api-endpoints/user-api.const';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../configs';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  roleName!: string;
  constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {}

  authenticate(user: any): Observable<any> {
    return this.communicationService
      .post<any>(UserAPI.authenticateUser(), user)
      .pipe(
        tap((response: any) => {
          if (response) {
            console.log(response);
            localStorage.setItem(
              AppConfig.auth.token,
              JSON.stringify(response)
            );
          }
        })
      );
  }

  // isLoggedIn(): boolean {
  // const token = localStorage.getItem(AppConfig.auth.token);
  // return !!token; // !! converts truthy/falsy values to true/false
  // }

  getLocalToken() {
    return JSON.parse(localStorage.getItem(AppConfig.auth.token) || '{}');
  }
  isLoggedIn(): boolean {
    if (!!!this.getLocalToken().accessToken) {
      return false;
    } else {
      return true;
    }
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['']);
  }

  getLocalStorageDetails(): any | null {
    const authDataString = localStorage.getItem(AppConfig.auth.token);
    if (!authDataString) {
      return null;
    }

    try {
      const authData: any = JSON.parse(authDataString);
      return authData;
    } catch (error) {
      return null;
    }
  }
}
