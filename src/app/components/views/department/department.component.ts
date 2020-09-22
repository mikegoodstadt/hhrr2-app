import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DEPARTMENTS, DepartmentService } from '@app/services/department.service';
import { EMPLOYEES, EmployeeService } from '@app/services/employee.service';
import { EditorReactiveComponent } from '@app/components/shared/editor-reactive/editor-reactive.component';
import { DialogComponent } from '@app/components/shared/dialog/dialog.component';
import bigInt from 'big-integer'; 
import { Record } from '@app/models/record.model';
import { Department } from '@app/models/department.model';
import { Employee } from '@app/models/employee.model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '@app/common/utils';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public originalOrder = Utils.originalOrder;
  public department: Observable<Department>;
  public records: Observable<Employee[]>;
  public employees: Observable<Employee[]>;
  public serviceName: string;
  public displayedColumns: Observable<string[]>;

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
    .then((val) => this.init())
    .catch((err) => console.log(err));
  }

  private init() {
    this.getDepartment();
    this.getEmployees();
    this.getDisplayedColumns();
  }

  private getDepartment() {
    const paramId = this.route.snapshot.paramMap.get("id");
    const bigId: bigInt.BigInteger = bigInt(paramId);
    this.department = this.deptService.records.pipe(
      map( arr => arr.find(rec => bigInt(rec.id).compare(bigId) === 0) )
    );
  }

  private getEmployees() {
    this.employees = combineLatest(this.records, this.department,
      (empls: any[], dept: any) => empls.filter(empl => empl.department === dept.name) );
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
  
  public edit(record: Record) {
    record = record || {id: null, name: ''};
    let header = '';
    if (record.id) {
      header = 'Edit Record';
    } else {
      header = 'Create Record';
      record = this.emplService.create();
    }
    const dialogRef = this.dialog.open(EditorReactiveComponent, {
      data: {
        header: header,
        record: record,
        serviceName: this.serviceName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.emplService.updateRecord(result);
    });
  }
  
  public delete(record: Record): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure want to delete this record?',
        confirmLabel: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) this.emplService.delete(record.id);
    });
  }

}
