import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminScreenComponent } from './pages/admin-screen/admin-screen.component';
import { AuthModule } from './pages/auth/auth.module';
import { ClassRegistrationComponent } from './pages/class-registration/class-registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './components/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TeacherRegistrationComponent } from './pages/teacher-registration/teacher-registration.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { TeacherScreenComponent } from './pages/teacher-screen/teacher-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminScreenComponent,
    ClassRegistrationComponent,
    SidebarComponent,
    TeacherRegistrationComponent,
    StudentRegistrationComponent,
    TeacherScreenComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
