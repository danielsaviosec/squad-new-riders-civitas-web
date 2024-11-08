import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './list/list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    ListComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    ListComponent,
    SidebarComponent
  ],
  providers: [MatSnackBar]
})

export class SharedModule {}
