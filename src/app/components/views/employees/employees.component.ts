import { Component } from '@angular/core';
import { RecordsComponent } from '@app/components/shared/records/records.component';
import { EmployeeService } from '@app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '@app/services/department.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '@app/models/department.model';
import { Employee } from '@app/models/employee.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
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
  }

  ngOnInit(): void {
    this.deptService.init()
    .then((val) => this.emplService.init())
    .then((val) => this.getDepartments())
    .then((val) => this.getEmployees())
    .then((val) => this.init())
    .catch((err) => console.log(err));
  }

  private getDepartments() {
    const paramId = this.route.snapshot.paramMap.get("id");
    this.departments = this.deptService.records.pipe(
      map( arr => (paramId) ? arr.filter(rec => rec.id === BigInt(paramId)) : arr )
    );
  }

  private getEmployees() {
    this.records = combineLatest([this.records, this.departments]).pipe(
      map(([empls, depts]) => {
        const deptNames = depts.map(d => d.name);
        return empls.filter(empl => deptNames.includes(empl.department))
       })
    );
  }

}
