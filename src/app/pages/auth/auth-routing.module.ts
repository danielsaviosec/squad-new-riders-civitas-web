import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectProfileComponent } from './components/select-profile/select-profile.component';
import { LoginTeacherComponent } from './components/login-teacher/login-teacher.component';
import { LoginGuardianComponent } from './components/login-guardian/login-guardian.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: SelectProfileComponent },
  { path: 'login-professor', component: LoginTeacherComponent },
  { path: 'login-responsavel', component: LoginGuardianComponent },
  { path: 'login-administrador', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
