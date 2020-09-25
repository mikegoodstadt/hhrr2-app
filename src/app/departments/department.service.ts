import { Injectable, InjectionToken } from '@angular/core';
import { CrudService } from '@app/core/crud.service';
import { DataService } from '@app/core/data.service';
import { Department } from './department.model';
import { map } from 'rxjs/operators';

export const DEPARTMENTS = new InjectionToken<string>('DepartmentService');

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends CrudService<Department> {

  constructor(
    public dataService: DataService,
  ) {
    super(Department, dataService);
  }

}
