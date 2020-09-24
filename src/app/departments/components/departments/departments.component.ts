import { Component } from '@angular/core';
import { RecordsComponent } from '@app/core/components/records/records.component';
import { DepartmentService } from '@app/departments/department.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: '../../../core/components/records/records.component.html',
  styleUrls: ['../../../core/components/records/records.component.scss']
})
export class DepartmentsComponent extends RecordsComponent {

  constructor(
    public recordService: DepartmentService,
    public dialog: MatDialog
  ) {
    super( recordService, dialog );
  }

}
