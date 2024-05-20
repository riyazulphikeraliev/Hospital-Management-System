import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PublicComponent } from './public.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContanctUsComponent } from './contanct-us/contanct-us.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
    {
        path: '',
        component:HomePageComponent,
    },
    {
       
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'aboutus', 
        component:AboutUsComponent
    },
    {
        path:'contactus',
        component:ContanctUsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'register',
        component:RegistrationComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule { }
