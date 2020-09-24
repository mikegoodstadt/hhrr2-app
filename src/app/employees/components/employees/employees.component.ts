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
    // console.log(paramId);
    this.departments = this.deptService.records.pipe(
      map( arr => (paramId) ? arr.filter(rec => rec.id === BigInt(paramId)) : arr )
    );
    // this.departments.subscribe(recs => console.log('depts:', recs));
  }

  private getEmployees() {
    this.records = combineLatest([this.records, this.departments]).pipe(
      map(([empls, depts]) => {
        const deptNames = depts.map(d => d.name);
        // console.log(deptNames);
        return empls.filter(empl => deptNames.includes(empl.department))
       })
    );
    // this.records.subscribe(recs => console.log('empls:', recs));
  }

}
