import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    data: {
      breadcrumb: 'Departments',
    },
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
