import { NgModule } from '@angular/core';
import { NgIdleModule } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SharedModule } from '@shared/shared.module';
import { SharedFeatureModule } from 'src/app/feature/shared/shared-feature.module';
import { SecureLayoutModule } from './secure-layout/secure-layout.module';
import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';

@NgModule({
  declarations: [SecureComponent],
  imports: [
    SharedModule,
    SecureRoutingModule,
    SecureLayoutModule,
    NgIdleModule,
    NgIdleKeepaliveModule,
    SharedFeatureModule,
  ],
})
export class SecureModule {}
