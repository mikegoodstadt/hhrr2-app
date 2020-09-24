import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsComponent } from './components/views/departments/departments.component';
import { EmployeesComponent } from './components/views/employees/employees.component';
import { EmployeeComponent } from './components/views/employee/employee.component';
import { SettingsComponent } from './components/views/settings/settings.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   outlet: 'system'
  // },
  {
    path: 'employees',
    component: EmployeesComponent,
    data: {
      breadcrumb: 'Employees',
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    data: {
      breadcrumb: 'Departments',
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      breadcrumb: 'Settings',
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'department/:id',
    component: EmployeesComponent,
    data: {
      breadcrumb: 'Department',
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id',
    component: EmployeeComponent,
    data: {
      breadcrumb: 'Employee',
    }
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/employees'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
