import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';

import { ClassListComponent } from './components/class-list/class-list.component';
import { SharedModule } from 'src/app/components/shared.module';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';

@NgModule({
  declarations: [
    ClassListComponent,
    TeacherListComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ],
})
export class MainModule {}
