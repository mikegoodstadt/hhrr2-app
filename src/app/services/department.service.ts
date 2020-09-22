import { Injectable, InjectionToken } from '@angular/core';
import { CrudService } from './crud.service';
import { IdService } from './id.service';
import { DataService } from './data.service';
import { Department } from '@app/models/department.model'

export const DEPARTMENTS = new InjectionToken<string>('DepartmentService');

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends CrudService<Department> {

  constructor(
    public idService: IdService,
    public dataService: DataService,
  ) {
    super(Department, idService, dataService);
  }
}
