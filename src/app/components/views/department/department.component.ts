import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DEPARTMENTS, DepartmentService } from '@app/services/department.service';
import { EMPLOYEES, EmployeeService } from '@app/services/employee.service';
import { EditorReactiveComponent } from '@app/components/shared/editor-reactive/editor-reactive.component';
import { DialogComponent } from '@app/components/shared/dialog/dialog.component';
import { Department } from '@app/models/department.model';
import { Employee } from '@app/models/employee.model';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '@app/common/utils';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public departments: Observable<Department[]>;
  public records: Observable<Employee[]>;
  public employees: Observable<Employee[]>;
  public deptName = "All";
  public serviceName: string;
  public displayedColumns: Observable<string[]>;
  public originalOrder = Utils.originalOrder;

  constructor(
    private route: ActivatedRoute,
    @Inject(DEPARTMENTS) public deptService: DepartmentService,
    @Inject(EMPLOYEES) public emplService: EmployeeService,
    public dialog: MatDialog
  ) {
    this.records = this.emplService.records;
    this.serviceName = this.emplService.serviceName;
  }

  ngOnInit(): void {
    this.deptService.init()
    .then((val) => this.emplService.init())
    .then((val) => this.getDepartments())
    .then((val) => this.getEmployees())
    .then((val) => this.init())
    .catch((err) => console.log(err));
  }

  private init() {
    this.getDisplayedColumns();
  }

  private getDepartments() {
    const paramId = this.route.snapshot.paramMap.get("id");
    this.departments = this.deptService.records.pipe(
      map( arr => (paramId) ? arr.filter(rec => rec.id === BigInt(paramId)) : arr )
    );
  }

  private getEmployees() {
    this.employees = combineLatest([this.records, this.departments]).pipe(
      map(([empls, depts]) => {
        const deptNames = depts.map(d => d.name);
        return empls.filter(empl => deptNames.includes(empl.department))
       })
    );
  }

  private getDisplayedColumns() {
    this.displayedColumns = this.records.pipe(
      map(dept => {
        let cols = Object.keys(dept[0]);
        cols.push('actions');
        return cols;
      })
    );
  }
  
  public edit(employee: Employee) {
    employee = employee || new Employee;
    let header = '';
    if (employee.id) {
      header = 'Edit Employee';
    } else {
      header = 'Create Employee';
      employee = this.emplService.create();
    }
    const dialogRef = this.dialog.open(EditorReactiveComponent, {
      data: {
        header: header,
        record: employee,
        serviceName: this.serviceName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.emplService.updateRecord(result);
    });
  }
  
  public delete(employee: Employee): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure want to delete this Employee?',
        confirmLabel: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) this.emplService.delete(employee);
    });
  }

}
