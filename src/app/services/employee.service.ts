import { Injectable, InjectionToken } from '@angular/core';
import { CrudService } from './crud.service';
import { IdService } from './id.service';
import { DataService } from './data.service';
import { Employee } from '@app/models/employee.model'

export const EMPLOYEES = new InjectionToken<string>('EmployeeService');

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<Employee> {

  constructor(
    public idService: IdService,
    public dataService: DataService,
  ) {
    super(Employee, idService, dataService);
  }
}
