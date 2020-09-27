import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '@app/core/crud.service';
import { EditorComponent } from '@app/ui/editor/editor.component';
import { DialogComponent } from '@app/ui/dialog/dialog.component';
import { Record } from '@app/core/record.model';
import { Observable, of } from 'rxjs';
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
  
  public async edit(record: Record) {
    let mode = (record) ? 'Edit' : 'New';
    let header = `${mode} ${this.recordType}`;
    this.recordService.new().then(rec => {
      record = record || rec;
      const dialogRef = this.dialog.open(EditorComponent, {
        data: {
          header: header,
          record: record,
          recordType: this.recordType
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (mode === 'New') {
            this.recordService.add(result);
          } else {
            this.recordService.update(result);
          }  
          this.records = this.recordService.records;
        }
      });
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
      if (result) {
        this.recordService.delete(record);
        this.records = this.recordService.records;
      };
    });
  }

}
