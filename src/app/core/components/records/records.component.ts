import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '@app/core/crud.service';
import { EditorComponent } from '@app/ui/editor/editor.component';
import { DialogComponent } from '@app/ui/dialog/dialog.component';
import { Record } from '@app/core/record.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '@app/shared/utils';

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
    this.init();
  }

  public init() {
    this.getDisplayedColumns();
  }

  private getDisplayedColumns() {
    this.displayedColumns = this.records.pipe(
      map(rec => {
        let cols = Object.keys(rec[0]);
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
      if (result) this.recordService.update(result);
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
