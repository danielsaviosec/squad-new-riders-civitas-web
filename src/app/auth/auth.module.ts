import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
