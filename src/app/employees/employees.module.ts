import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@app/ui/ui.module';

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
    UiModule,
    EmployeesRoutingModule,
  ],
  exports: [
    EmployeesComponent,
    ProfileComponent,
  ],
})
export class EmployeesModule { }
