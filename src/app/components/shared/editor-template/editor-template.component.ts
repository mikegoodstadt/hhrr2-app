import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DEPARTMENTS, DepartmentService } from '@app/services/department.service';

@Component({
  selector: 'app-editor-template',
  templateUrl: './editor-template.component.html',
  styleUrls: ['./editor-template.component.scss']
})
export class EditorTemplateComponent implements OnInit {
  public record: any;
  public serviceName: string;
  public departments: any[];
  public nextId: bigInt.BigInteger;

  constructor(
    public dialogRef: MatDialogRef<EditorTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DEPARTMENTS) public deptService: DepartmentService,
    ) {
      this.record = this.data.record;
      this.serviceName = data.serviceName;
    }

  public formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
    this.departments = this.deptService.getRecordsAll().map(dept => dept.name);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
  }

}