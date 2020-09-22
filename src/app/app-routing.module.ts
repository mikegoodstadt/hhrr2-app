import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/views/admin/admin.component';
import { DepartmentComponent } from './components/views/department/department.component';
import { EmployeeComponent } from './components/views/employee/employee.component';
import { SettingsComponent } from './components/views/settings/settings.component';
import { DEPARTMENTS, DepartmentService } from './services/department.service';
import { EMPLOYEES, EmployeeService } from './services/employee.service';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   outlet: 'system'
  // },
  {
    path: 'employees',
    component: AdminComponent,
    data: {
      breadcrumb: 'Employees',
      requiredService: EMPLOYEES,
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'departments',
    component: AdminComponent,
    data: {
      breadcrumb: 'Departments',
      requiredService: DEPARTMENTS,
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
    component: DepartmentComponent,
    data: {
      breadcrumb: 'Department',
      requiredService: DEPARTMENTS,
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id',
    component: EmployeeComponent,
    data: {
      breadcrumb: 'Employee',
      requiredService: EMPLOYEES,
    }
    // canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   component: SidebarComponent,
  //   outlet: 'sidebar'
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/employees'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  providers: [
    {
      provide: DEPARTMENTS,
      useClass: DepartmentService
    },
    {
      provide: EMPLOYEES,
      useClass: EmployeeService
    }
  ]
})
export class AppRoutingModule { }
