import { Injectable } from '@angular/core';
import { RecordsService } from '@app/core/records.service';
import { DataService } from '@app/core/data.service';
import { Employee } from './employee.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends RecordsService<Employee> {

  constructor(
    public dataService: DataService<Employee>,
  ) {
    super(Employee, dataService);
  }
}
