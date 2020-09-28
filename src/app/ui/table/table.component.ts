import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentsService } from '@app/departments/departments.service';
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
    private deptService: DepartmentsService
  ) {
    this.dataSource = this.records;
    this.edit = new EventEmitter<any>();
    this.delete = new EventEmitter<any>();
  }

  ngOnInit(): void {
    /** MaterialTable DataSource from Records to permit reset of Filter. */
    this.dataSource = this.records;
    /** Department Names to async replace Ids in MaterialTable. */
    this.departments = this.deptService.nameList;
  }

  /**
   * Navigate to route by type and id.
   * @param record selected in Table
   */
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
  
  /**
   * Filter for Dates greater than or equal to selected.
   * @param event from DatePicker in Table header
   */
  public filterDates(event: Event): void {
    this.filterColor = 'warn';
    /** Get Date from DatePicker event */
    const checkDate = new Date((event.target as HTMLInputElement).value).getTime();
    /** Filter for Dates greater/equal to picked Date */
    this.dataSource = this.records.pipe(
      map(arr => arr.filter(rec => rec['startDate'].getTime() >= checkDate ))
    );
  };

  /**
   * Remove Date filter by setting to original Records.
   * @param event Clear DatePicker in Table header
   */
  public clearFilter(event: Event): void {
    event.stopPropagation();
    this.filterDate = null;
    this.dataSource = this.records;
    this.filterColor = 'secondary';
  }

}
