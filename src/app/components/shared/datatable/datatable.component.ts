import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditorReactiveComponent } from '../editor-reactive/editor-reactive.component';
import { DialogComponent } from '../dialog/dialog.component';
import { Record } from '@app/models/record.model'

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  public records: Observable<any[]>;
  public dataSource: Observable<any[]>;
  private recordsService: any;
  public serviceName: string;
  public displayedColumns: Observable<string[]>;
  public filterToggle = false;
  public filterDate: any;
  public filterColor = 'secondary';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    public dialog: MatDialog
  ) {
    const SERVICE_TOKEN = route.snapshot.data['requiredService'];
    this.recordsService = injector.get<string>(<any>SERVICE_TOKEN);
    this.records = this.recordsService.records;
    this.dataSource = this.records;
    this.serviceName = this.recordsService.serviceName;
  }

  ngOnInit(): void {
    this.recordsService.init();
    this.displayedColumns = this.records.pipe(
      map(dept => {
        let cols = Object.keys(dept[0]);
        cols.push('actions');
        return cols;
      })
    );
  }

  public view(record: Record) {
    const id = record.id.toString();
    this.router.navigate([this.serviceName.toLowerCase(), id])
  }

  public edit(record: Record) {
    record = record || {id: null, name: ''};
    let header = '';
    if (record.id) {
      header = 'Edit Record';
    } else {
      header = 'Create Record';
      record = this.recordsService.create();
    }
    const dialogRef = this.dialog.open(EditorReactiveComponent, {
      data: {
        header: header,
        record: record,
        serviceName: this.serviceName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.recordsService.updateRecord(result);
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
      if (result) this.recordsService.delete(record.id);
    });
  }

  public toggleFilter() {
    this.filterToggle = !this.filterToggle;
  }
  
  public filter(event: Event) {
    this.filterColor = 'warn';
    const checkDate = new Date((event.target as HTMLInputElement).value).getTime();
    console.log(checkDate);
    this.dataSource = this.records.pipe(
      map(arr => arr.filter(rec => {
        console.log(rec['startDate']);
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
