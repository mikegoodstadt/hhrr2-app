import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
  ],
  exports: [
    EmployeesComponent,
    ProfileComponent,
  ],
})
export class EmployeesModule { }
