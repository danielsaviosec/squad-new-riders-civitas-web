import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectProfileComponent } from './select-profile/select-profile.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { LoginGuardianComponent } from './login-guardian/login-guardian.component';

const routes: Routes = [
  { path: '', component: SelectProfileComponent },
  { path: 'login/professor', component: LoginTeacherComponent },
  { path: 'login/responsavel', component: LoginGuardianComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
