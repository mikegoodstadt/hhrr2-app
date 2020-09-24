import { Injectable, InjectionToken } from '@angular/core';
import { CrudService } from '@app/core/crud.service';
import { IdService } from '@app/core/id.service';
import { DataService } from '@app/core/data.service';
import { Department } from './department.model'

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
