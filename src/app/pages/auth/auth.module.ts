import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthRoutingModule } from './auth-routing.module';
import { SelectProfileComponent } from './select-profile/select-profile.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { LoginGuardianComponent } from './login-guardian/login-guardian.component';
import { SharedModule } from 'src/app/components/shared.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SelectProfileComponent,
    LoginTeacherComponent,
    LoginGuardianComponent,
    AdminLoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    SharedModule
  ]
})
export class AuthModule {}
