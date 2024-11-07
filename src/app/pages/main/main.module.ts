import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';

import { ClassListComponent } from './components/class-list/class-list.component';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [
    ClassListComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ],
})
export class MainModule {}
