import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './list/list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { AdminScreenComponent } from './admin-screen/admin-screen.component';
import { TeacherScreenComponent } from './teacher-screen/teacher-screen.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    ListComponent,
    ListTeacherComponent,
    SidebarComponent,
    AdminScreenComponent,
    TeacherScreenComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    ListComponent,
    ListTeacherComponent,
    SidebarComponent,
    RouterModule,
    BreadcrumbComponent
  ],
  providers: [MatSnackBar]
})

export class SharedModule {}
