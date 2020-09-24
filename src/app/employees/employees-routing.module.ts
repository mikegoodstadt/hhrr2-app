import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    data: {
      breadcrumb: 'Employees',
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
    path: 'profile/:id',
    component: ProfileComponent,
    data: {
      breadcrumb: 'Profile',
    }
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
