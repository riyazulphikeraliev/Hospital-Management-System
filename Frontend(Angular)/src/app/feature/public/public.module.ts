import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContanctUsComponent } from './contanct-us/contanct-us.component';
import { SharedFeatureModule } from '../shared/shared-feature.module';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    PublicComponent,
    RegistrationComponent,
    HomePageComponent,
    AboutUsComponent,
    ContanctUsComponent,
  ],
  imports: [
    PublicRoutingModule,
    SharedModule,
    SharedFeatureModule
  ]
})
export class PublicModule { }
