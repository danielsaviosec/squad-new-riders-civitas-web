import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminScreenComponent } from './pages/admin-screen/admin-screen.component';
import { ClassRegistrationComponent } from './pages/class-registration/class-registration.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  { path: 'admin-screen', component: AdminScreenComponent },
  { path: 'class-registration', component: ClassRegistrationComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
