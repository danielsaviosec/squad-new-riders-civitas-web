import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { TeacherListComponent } from "./components/teacher-list/teacher-list.component";
import { ClassRegistrationComponent } from "./components/class-registration/class-registration.component";
import { TeacherRegistrationComponent } from "./components/teacher-registration/teacher-registration.component";
import { StudentRegistrationComponent } from "./components/student-registration/student-registration.component";
import { StudentListComponent } from "./components/student-list/student-list.component";
import { UpdateClassComponent } from "./components/update-class/update-class.component";
import { UpdateTeacherComponent } from "./components/update-teacher/update-teacher.component";
import { UpdateStudentComponent } from "./components/update-student/update-student.component";
import { AuthGuard } from "../auth/auth.guard";
import { AdiComponent } from "./components/adi/adi.component";
import { StudentClassListComponent } from "./components/student-class-list/student-class-list.component";
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";
import { FormRegistrationComponent } from "./components/form-registration/form-registration.component";
import { AdiDetailsComponent } from "./components/adi-details/adi-details.component";

const routes: Routes = [
  {
    path: 'class-list',
    component: ClassListComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'teacher'] }
  },
  {
    path: 'teacher-list',
    component: TeacherListComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: '',
    component: HomeScreenComponent
  },
  {
    path: 'class-registration',
    component: ClassRegistrationComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'teacher-registration',
    component: TeacherRegistrationComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'student-registration',
    component: StudentRegistrationComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'student-class-list/:id',
    component: StudentClassListComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['teacher'] }
  },
  {
    path: 'update-class/:id',
    component: UpdateClassComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'update-teacher/:id',
    component: UpdateTeacherComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'update-student/:id',
    component: UpdateStudentComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'class/:classId/student-adi/:studentId',
    component: AdiComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'teacher', 'guardian'] }
  },
  {
    path: 'adi-details/:id',
    component: AdiDetailsComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'teacher', 'guardian'] }
  },
  {
    path: 'form-registration/:id',
    component: FormRegistrationComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'teacher'] }
  },
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: '**', redirectTo: '/main' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
