import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SelectProfileComponent } from './select-profile/select-profile.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { LoginGuardianComponent } from './login-guardian/login-guardian.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [
    AdminLoginComponent, 
    SelectProfileComponent,
    LoginTeacherComponent,
    LoginGuardianComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
})
export class AuthModule {}
