import { Component } from '@angular/core';
import { RecordsComponent } from '@app/components/shared/records/records.component';
import { DepartmentService } from '@app/services/department.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends RecordsComponent {

  constructor(
    public recordService: DepartmentService,
    public dialog: MatDialog
  ) {
    super( recordService, dialog );
  }

}
