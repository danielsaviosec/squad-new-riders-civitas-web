import { Routes } from "@angular/router";
import { SelectProfileComponent } from "./pages/select-profile/select-profile.component";
import { LoginTeacherComponent } from "./pages/login-teacher/login-teacher.component";
import { LoginGuardianComponent } from "./pages/login-guardian/login-guardian.component";

export const routes: Routes = [
  { path: '', component: SelectProfileComponent },
  { path: 'login/professor', component: LoginTeacherComponent },
  { path: 'login/responsavel', component: LoginGuardianComponent }
];
