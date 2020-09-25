import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsComponent } from './components/departments/departments.component';
import { EmployeesComponent } from '../employees/components/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    data: {
      breadcrumb: 'Departments',
    },
    // canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: EmployeesComponent,
    data: {
      breadcrumb: 'Department',
    },
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
