import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminScreenComponent } from './pages/admin-screen/admin-screen.component';
import { TeacherScreenComponent } from './pages/teacher-screen/teacher-screen.component';
import { ClassRegistrationComponent } from './pages/class-registration/class-registration.component';
import { TeacherRegistrationComponent } from './pages/teacher-registration/teacher-registration.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  { path: 'admin-screen', component: AdminScreenComponent },
  { path: 'teacher-screen', component: TeacherScreenComponent },
  { path: 'class-registration', component: ClassRegistrationComponent },
  { path: 'teacher-registration', component: TeacherRegistrationComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
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
