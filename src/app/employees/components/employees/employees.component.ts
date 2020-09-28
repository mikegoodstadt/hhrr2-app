import { Component } from '@angular/core';
import { RecordsComponent } from '@app/core/components/records/records.component';
import { EmployeesService } from '@app/employees/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentsService } from '@app/departments/departments.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '@app/departments/department.model';
import { Employee } from '@app/employees/employee.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends RecordsComponent {
  public records: Observable<Employee[]>;
  public departments: Observable<Department[]>;
  public deptName = "All";

  constructor(
    public emplService: EmployeesService,
    public dialog: MatDialog,
    public deptService: DepartmentsService,
    private route: ActivatedRoute,
  ) {
    super(emplService, dialog);
    this.departments = this.deptService.records;
  }

  ngOnInit(): void {
    this.setEmployees();
    this.init();
  }

  /**
   * Combine filter Employees by Department
   */
  private setEmployees() {
    const paramId: string = this.route.snapshot.paramMap.get("id");
    const deptIds: Observable<number[]> = this.deptService.getIdList(paramId);
    this.records = combineLatest([this.records, deptIds]).pipe(
      map( ([empls, ids]) =>
       (ids.length > 0) ? empls.filter(empl => ids.includes(empl.department)): empls )
    );
  }

}
