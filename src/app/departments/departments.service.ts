import { Injectable } from '@angular/core';
import { RecordsService } from '@app/core/records.service';
import { DataService } from '@app/core/data.service';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends RecordsService<Department> {

  constructor(
    public dataService: DataService<Department>,
  ) {
    super(Department, dataService);
  }

}
