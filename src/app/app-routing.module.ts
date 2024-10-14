import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaAdminComponent } from './pages/tela-admin/tela-admin.component';

const routes: Routes = [
  { path: 'tela-admin', component: TelaAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
