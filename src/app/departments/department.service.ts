import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/crud.service';
import { DataService } from '@app/core/data.service';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends CrudService<Department> {

  constructor(
    public dataService: DataService<Department>,
  ) {
    super(Department, dataService);
  }

}
