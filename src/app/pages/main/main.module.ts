import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ClassListComponent } from './components/class-list/class-list.component';
import { SharedModule } from 'src/app/components/shared.module';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { AdminScreenComponent } from "./components/admin-screen/admin-screen.component";
import { ClassRegistrationComponent } from "./components/class-registration/class-registration.component";
import { TeacherRegistrationComponent } from "./components/teacher-registration/teacher-registration.component";
import { StudentRegistrationComponent } from "./components/student-registration/student-registration.component";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { SnackbarErrorComponent } from 'src/app/components/snackbar-error/snackbar-error.component';
import { TeacherScreenComponent } from './components/teacher-screen/teacher-screen.component';
import { MatSelectModule } from '@angular/material/select';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SearchClassComponent } from './components/search-class/search-class.component';
import { SearchStudentComponent } from './components/search-student/search-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { UpdateTeacherComponent } from './components/update-teacher/update-teacher.component';
import { UpdateClassComponent } from './components/update-class/update-class.component';
import { FormRegistrationComponent } from './components/form-registration/form-registration.component'

@NgModule({
  declarations: [
    ClassListComponent,
    TeacherListComponent,
    AdminScreenComponent,
    ClassRegistrationComponent,
    TeacherRegistrationComponent,
    StudentRegistrationComponent,
    TeacherScreenComponent,
    SnackbarErrorComponent,
    StudentListComponent,
    SearchClassComponent,
    SearchStudentComponent,
    UpdateStudentComponent,
    UpdateTeacherComponent,
    UpdateClassComponent,
    FormRegistrationComponent // Certifique-se de declarar o componente
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule, // Certifique-se de importar o MatSnackBarModule
    MatProgressSpinnerModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ]
})
export class MainModule {}
