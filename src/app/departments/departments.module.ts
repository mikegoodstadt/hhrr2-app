import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@app/ui/ui.module';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './components/departments/departments.component';

@NgModule({
  declarations: [
    DepartmentsComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    DepartmentsRoutingModule,
  ],
  exports: [
    DepartmentsComponent,
  ],
})
export class DepartmentsModule { }
