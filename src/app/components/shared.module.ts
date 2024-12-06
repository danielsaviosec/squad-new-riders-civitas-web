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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MenuHamburguerComponent } from './menu-hamburguer/menu-hamburguer.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    ListComponent,
    SidebarComponent,
    MenuHamburguerComponent,
    ListTeacherComponent,
    HomeAdminComponent,
    HomeTeacherComponent,
    BreadcrumbComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    ListComponent,
    ListTeacherComponent,
    SidebarComponent,
    RouterModule,
    BreadcrumbComponent,
    MenuHamburguerComponent,
    RouterModule,
    HomeAdminComponent,
    HomeTeacherComponent,
  ],
  providers: [MatSnackBar]
})

export class SharedModule { }
