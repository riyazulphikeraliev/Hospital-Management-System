import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptorProvider } from '@core/interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from '@core/interceptors/error.interceptor';
import { FakeBackendInterceptorProvider } from '@core/interceptors/fake-backend.interceptor';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'secure',
    loadChildren: () =>
      import('./feature/secure/secure.module').then((m) => m.SecureModule),
    data: {
      breadcrumb: 'Home',
    }
  },
  {
    path: 'shared',
    loadChildren: () => import("./feature/shared/shared-feature.module").then((m) => m.SharedFeatureModule)
  },

  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
  providers: [
    FakeBackendInterceptorProvider,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
  ],
})
export class AppRoutingModule {}
