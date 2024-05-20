import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { map, Observable, shareReplay } from 'rxjs';
import { NavigationItems } from '../constants/navigation-item.const';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nggt-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {

  /* Public Properties */
  navigationItems = NavigationItems;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) { }

  /* Public Methods */
  gotoProfile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    this.authService.logout();
  }
}
