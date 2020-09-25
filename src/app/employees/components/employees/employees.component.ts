import { Component } from '@angular/core';
import { RecordsComponent } from '@app/core/components/records/records.component';
import { EmployeeService } from '@app/employees/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '@app/departments/department.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '@app/departments/department.model';
import { Employee } from '@app/employees/employee.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: '../../../core/components/records/records.component.html',
  styleUrls: ['../../../core/components/records/records.component.scss']
})
export class EmployeesComponent extends RecordsComponent {
  public departments: Observable<Department[]>;
  public records: Observable<Employee[]>;
  public deptName = "All";

  constructor(
    public emplService: EmployeeService,
    public dialog: MatDialog,
    public deptService: DepartmentService,
    private route: ActivatedRoute,
  ) {
    super(emplService, dialog);
    this.departments = this.deptService.records;
  }

  ngOnInit(): void {
    this.setDepartments();
    this.setEmployees();
    this.init();
  }

  private setDepartments() {
    const paramId = this.route.snapshot.paramMap.get("id");
    this.departments = this.deptService.records.pipe(
      map( arr => (paramId) ? arr.filter(rec => rec.name.toLowerCase() === paramId) : arr )
    );
  }

  private setEmployees() {
    this.records = combineLatest([this.records, this.departments]).pipe(
      map(([empls, depts]) => {
        const deptNames = depts.map(d => d.name);
        return empls.filter(empl => deptNames.includes(empl.department))
       })
    );
  }

}
