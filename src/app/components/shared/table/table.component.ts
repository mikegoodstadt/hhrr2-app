import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Record } from '@app/models/record.model'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() records: Observable<any[]>;
  public dataSource: Observable<any[]>;
  @Input() recordType: string;
  @Input() displayedColumns: Observable<string[]>;
  @Output() edit: EventEmitter<any>;
  @Output() delete: EventEmitter<any>;
  public filterToggle = false;
  public filterDate: any;
  public filterColor = 'secondary';

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataSource = this.records;
    this.edit = new EventEmitter<any>();
    this.delete = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.dataSource = this.records;
  }

  public viewRecord(record: Record) {
    const id = record.id.toString();
    this.router.navigate([this.recordType.toLowerCase(), id])
  }

  public editRecord(record: Record) {
    this.edit.emit(record);
  }
  
  public deleteRecord(record: Record): void {
    this.delete.emit(record);
  }

  public toggleFilter() {
    this.filterToggle = !this.filterToggle;
  }
  
  public filterDates(event: Event) {
    this.filterColor = 'warn';
    const checkDate = new Date((event.target as HTMLInputElement).value).getTime();
    this.dataSource = this.records.pipe(
      map(arr => arr.filter(rec => {
        return rec['startDate'].getTime() >= checkDate;
      }))
    );
  };

  public clearFilter(event: Event) {
    event.stopPropagation();
    this.filterDate = null;
    this.dataSource = this.records;
    this.filterColor = 'secondary';
  }

}
