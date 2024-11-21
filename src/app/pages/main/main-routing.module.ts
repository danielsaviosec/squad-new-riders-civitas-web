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

const routes: Routes = [
  { path: 'class-list', component: ClassListComponent },
  { path: 'teacher-list', component: TeacherListComponent },
  { path: '', component: AdminScreenComponent },
  { path: 'class-registration', component: ClassRegistrationComponent },
  { path: 'teacher-registration', component: TeacherRegistrationComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'teacher-screen', component: TeacherScreenComponent },
  { path: 'student-list', component: StudentListComponent }, 
  { path: 'search-class', component: SearchClassComponent }, 
  { path: 'search-student', component: SearchStudentComponent },
  { path: 'update-class', component: UpdateClassComponent },
  { path: 'update-teacher', component: UpdateTeacherComponent },
  { path: 'update-student', component: UpdateStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
