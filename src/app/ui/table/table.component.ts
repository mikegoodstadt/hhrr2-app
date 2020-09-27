import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '@app/departments/department.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Record } from '@app/core/record.model'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() records: Observable<any[]>;
  public dataSource: Observable<any[]>;
  @Input() recordType: string;
  @Input() displayedColumns: string[];
  @Output() edit: EventEmitter<any>;
  @Output() delete: EventEmitter<any>;
  public filterToggle = false;
  public filterDate: any;
  public filterColor = 'secondary';
  public departments: Observable<string[]>;
  
  constructor(
    private router: Router,
    private deptService: DepartmentService
  ) {
    this.dataSource = this.records;
    this.edit = new EventEmitter<any>();
    this.delete = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.dataSource = this.records;
    this.departments = this.deptService.nameList;
  }

  public viewRecord(record: Record = null): void {
    if (record) {
      let path = this.recordType.toLowerCase();
      const id = (path === 'department') ? record.name.toLowerCase() : record.id.toString();
      this.router.navigate([path, id])
    }
  }

  public editRecord(record: Record = null): void {
    this.edit.emit(record);
  }
  
  public deleteRecord(record: Record = null): void {
    if (record) {
      this.delete.emit(record);
    }
  }

  public toggleFilter(): void {
    this.filterToggle = !this.filterToggle;
  }
  
  public filterDates(event: Event): void {
    this.filterColor = 'warn';
    const checkDate = new Date((event.target as HTMLInputElement).value).getTime();
    this.dataSource = this.records.pipe(
      map(arr => arr.filter(rec => rec['startDate'].getTime() >= checkDate ))
    );
  };

  public clearFilter(event: Event): void {
    event.stopPropagation();
    this.filterDate = null;
    this.dataSource = this.records;
    this.filterColor = 'secondary';
  }

}
