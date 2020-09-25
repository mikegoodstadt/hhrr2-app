import { Injectable, InjectionToken } from '@angular/core';
import { CrudService } from '@app/core/crud.service';
import { DataService } from '@app/core/data.service';
import { Employee } from './employee.model'

export const EMPLOYEES = new InjectionToken<string>('EmployeeService');

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<Employee> {

  constructor(
    public dataService: DataService,
  ) {
    super(Employee, dataService);
  }
}
