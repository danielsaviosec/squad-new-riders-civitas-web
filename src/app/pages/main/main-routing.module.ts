import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./components/class-list/class-list.component";

const routes: Routes = [
  { path: '', component: ClassListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
