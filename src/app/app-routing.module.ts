import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from '@app/settings/settings.component';

const routes: Routes = [
  {
    path: 'department',
    loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule)
  },
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
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
    redirectTo: '/employees'
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
