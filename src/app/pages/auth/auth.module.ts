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

@NgModule({
  declarations: [
    SelectProfileComponent,
    LoginTeacherComponent,
    LoginGuardianComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class AuthModule {}
