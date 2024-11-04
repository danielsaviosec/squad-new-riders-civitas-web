import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    BackButtonComponent
  ]
})

export class SharedModule {}
