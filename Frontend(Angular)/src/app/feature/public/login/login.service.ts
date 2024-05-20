import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly landingScreen = '/secure/dashboard';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(user:any): void {
    this.authService.authenticate(user)
      .subscribe((x) => {
        this.router.navigate([this.landingScreen]);
      });
  }
}
