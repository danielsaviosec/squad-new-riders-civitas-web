import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminScreenComponent } from './pages/admin-screen/admin-screen.component';
import { ClassRegistrationComponent } from './pages/class-registration/class-registration.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';

const routes: Routes = [
  { path: 'admin-screen', component: AdminScreenComponent },
  { path: 'class-registration', component: ClassRegistrationComponent },
  { path: 'admin-login', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
