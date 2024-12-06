import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ClassListComponent } from './components/class-list/class-list.component';
import { SharedModule } from 'src/app/components/shared.module';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
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
import { MatSelectModule } from '@angular/material/select';
import { StudentListComponent } from './components/student-list/student-list.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { UpdateTeacherComponent } from './components/update-teacher/update-teacher.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AdiComponent } from './components/adi/adi.component';
import { StudentClassListComponent } from './components/student-class-list/student-class-list.component';
import { FormRegistrationComponent } from './components/form-registration/form-registration.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component'
import { UpdateClassComponent } from './components/update-class/update-class.component';
import { AdiDetailsComponent } from './components/adi-details/adi-details.component';
import { SmartMaskDirective } from 'src/app/shared/smart-mask.directive';
import { CpfMaskDirective } from 'src/app/shared/cpf-mask.directive';

@NgModule({
  declarations: [
    ClassListComponent,
    TeacherListComponent,
    ClassRegistrationComponent,
    TeacherRegistrationComponent,
    StudentRegistrationComponent,
    SnackbarErrorComponent,
    StudentListComponent,
    UpdateStudentComponent,
    UpdateTeacherComponent,
    UpdateClassComponent,
    FormRegistrationComponent,
    HomeScreenComponent,
    AdiComponent,
    StudentClassListComponent,
    FormRegistrationComponent,
    AdiDetailsComponent,
    SmartMaskDirective,
    CpfMaskDirective
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule
  ]
})
export class MainModule {}
