import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { TeacherListComponent } from "./components/teacher-list/teacher-list.component";
import { AdminScreenComponent } from "./components/admin-screen/admin-screen.component";
import { ClassRegistrationComponent } from "./components/class-registration/class-registration.component";
import { TeacherRegistrationComponent } from "./components/teacher-registration/teacher-registration.component";
import { StudentRegistrationComponent } from "./components/student-registration/student-registration.component";
import { TeacherScreenComponent } from "./components/teacher-screen/teacher-screen.component";
import { StudentListComponent } from "./components/student-list/student-list.component";
import { SearchClassComponent } from "./components/search-class/search-class.component";
import { SearchStudentComponent } from "./components/search-student/search-student.component";
import { UpdateClassComponent } from "./components/update-class/update-class.component";
import { UpdateTeacherComponent } from "./components/update-teacher/update-teacher.component";
import { UpdateStudentComponent } from "./components/update-student/update-student.component";
import { AuthGuard } from "../auth/auth.guard";
import { AdiComponent } from "./components/adi/adi.component";
import { StudentClassListComponent } from "./components/student-class-list/student-class-list.component";
import { FormRegistrationComponent } from "./components/form-registration/form-registration.component";
import { HomeScreenComponent } from "./components/home-screen/home-screen.component";

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
    path: 'teacher-screen',
    component: TeacherScreenComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['teacher'] }
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
    path: 'search-class',
    component: SearchClassComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'search-student',
    component: SearchStudentComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'update-class',
    component: UpdateClassComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'update-teacher',
    component: UpdateTeacherComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'update-student',
    component: UpdateStudentComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] }
  },
  {
    path: 'adi/:id',
    component: AdiComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'teacher'] }
  },
  {
    path: 'form-registration',
    component: FormRegistrationComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'teacher'] }
  },
  {
    path: 'home-screen',
    component: HomeScreenComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
