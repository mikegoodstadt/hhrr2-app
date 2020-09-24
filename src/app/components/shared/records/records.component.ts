import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '@app/services/crud.service';
import { EditorComponent } from '../../shared/editor/editor.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Record } from '@app/models/record.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '@app/common/utils';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  public records: Observable<Record[]>;
  public recordType: string;
  public displayedColumns: Observable<string[]>;
  public recordsTitle: string;
  public originalOrder = Utils.originalOrder;

  constructor(
    public recordService: CrudService<Record>,
    public dialog: MatDialog
  ) {
    this.records = this.recordService.records;
    this.recordType = this.recordService.recordType;
    this.recordsTitle = this.recordType + 's';
  }

  ngOnInit(): void {
    this.recordService.init()
    .then((val) => this.init())
    .catch((err) => console.log(err));
  }

  public init() {
    this.getDisplayedColumns();
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
    record = record || new Record;
    let header = '';
    if (record.id) {
      header = 'Edit ' + this.recordType;
    } else {
      header = 'Create ' + this.recordType;
      record = this.recordService.create();
    }
    const dialogRef = this.dialog.open(EditorComponent, {
      data: {
        header: header,
        record: record,
        recordType: this.recordType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.recordService.updateRecord(result);
    });
  }
  
  public delete(record: Record): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure want to delete this ' +  this.recordType + ' ?',
        confirmLabel: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.recordService.delete(record);
    });
  }

}
