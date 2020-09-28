import { Component } from '@angular/core';
import { RecordsComponent } from '@app/core/components/records/records.component';
import { DepartmentsService } from '@app/departments/departments.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends RecordsComponent {

  constructor(
    public deptsService: DepartmentsService,
    public dialog: MatDialog
  ) {
    super( deptsService, dialog );
  }

}
