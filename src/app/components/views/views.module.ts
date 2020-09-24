import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/components/shared/shared.module';

import { DepartmentsComponent } from './departments/departments.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    DepartmentsComponent,
    EmployeeComponent,
    EmployeesComponent,
    SettingsComponent,
  ],
  exports: [],
})
export class ViewsModule { }
