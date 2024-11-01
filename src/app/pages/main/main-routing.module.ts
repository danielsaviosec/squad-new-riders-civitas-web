import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: '', component: ClassListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
