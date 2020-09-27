import { Component } from '@angular/core';
import { RecordsComponent } from '@app/core/components/records/records.component';
import { EmployeeService } from '@app/employees/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '@app/departments/department.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '@app/departments/department.model';
import { Employee } from '@app/employees/employee.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: '../../../core/components/records/records.component.html',
  styleUrls: ['../../../core/components/records/records.component.scss']
})
export class EmployeesComponent extends RecordsComponent {
  public records: Observable<Employee[]>;
  public departments: Observable<Department[]>;
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
    this.setEmployees();
    this.init();
  }

  private setEmployees() {
    const paramId = this.route.snapshot.paramMap.get("id");
    const deptIds: Observable<number[]> = this.departments.pipe(
      map(depts => depts.reduce( (arr, dept) => {
        if (dept.name.toLowerCase() === paramId) arr.push(dept.id)
        return arr;
      }, [])
    ));

    this.records = combineLatest([this.records, deptIds]).pipe(
      map(([empls, ids]) => {
        console.log(ids);
        return (ids.length > 0) ? empls.filter(empl => ids.includes(empl.department)): empls;
       })
    );
  }

}
