import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '@app/settings/settings.component';

const routes: Routes = [

  {
    path: 'departments',
    loadChildren: () => import('@app/departments/departments.module').then(m => m.DepartmentsModule)
  },
  {
    path: 'department',
    loadChildren: () => import('@app/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('@app/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('@app/employees/employees.module').then(m => m.EmployeesModule)
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
    path: '',
    pathMatch: 'full',
    redirectTo: '/settings'
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
