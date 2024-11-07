import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { TeacherListComponent } from "./components/teacher-list/teacher-list.component";

const routes: Routes = [
  { path: 'class-list', component: ClassListComponent },
  { path: 'teacher-list', component: TeacherListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
