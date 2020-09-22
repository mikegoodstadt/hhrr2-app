import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/components/shared/shared.module';

import { AdminComponent } from './admin/admin.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    AdminComponent,
    SettingsComponent,
    EmployeeComponent,
    DepartmentComponent,
  ],
  exports: [
    AdminComponent,
  ],
})
export class ViewsModule { }
