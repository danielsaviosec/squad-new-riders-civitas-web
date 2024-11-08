import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { TeacherListComponent } from "./components/teacher-list/teacher-list.component";
import { AdminScreenComponent } from "./components/admin-screen/admin-screen.component";
import { ClassRegistrationComponent } from "./components/class-registration/class-registration.component";
import { TeacherRegistrationComponent } from "./components/teacher-registration/teacher-registration.component";
import { StudentRegistrationComponent } from "./components/student-registration/student-registration.component";
import { TeacherScreenComponent } from "./components/teacher-screen/teacher-screen.component";

const routes: Routes = [
  { path: 'class-list', component: ClassListComponent },
  { path: 'teacher-list', component: TeacherListComponent },
  { path: 'admin-screen', component: AdminScreenComponent },
  { path: 'class-registration', component: ClassRegistrationComponent },
  { path: 'teacher-registration', component: TeacherRegistrationComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'teacher-screen', component: TeacherScreenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
