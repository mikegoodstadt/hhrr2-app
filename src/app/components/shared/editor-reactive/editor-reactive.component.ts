import { Component, OnInit, Input, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DEPARTMENTS, DepartmentService } from '@app/services/department.service';
import bigInt from 'big-integer';
import { Utils } from '@app/common/utils';

@Component({
  selector: 'app-editor-reactive',
  templateUrl: './editor-reactive.component.html',
  styleUrls: ['./editor-reactive.component.scss'],
  providers: [ DatePipe ]
})
export class EditorReactiveComponent implements OnInit {
  public record: any;
  public serviceName: string;
  public departments: any[];
  public nextId: bigInt.BigInteger;

  public ageMin: number = 18;
  public ageMax: number = 65;
  public startDateMin: Date;
  public startDateMax: Date;
  public errorMessages = {};

  constructor(
    public dialogRef: MatDialogRef<EditorReactiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DEPARTMENTS) public deptService: DepartmentService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    ) {
      this.record = this.data.record;
      this.serviceName = data.serviceName;
    }
    
  public editorForm: FormGroup;
    
  ngOnInit(): void {
    this.getDepartments();
    this.setErrorMessages();
    this.generateForm();
  }

  private getDepartments() {
    this.departments = this.deptService.getRecordsAll().map(dept => dept.name);
  }

  private setErrorMessages() {
    const currentDate = new Date();
    this.startDateMin = new Date(currentDate.getFullYear() - this.ageMax, currentDate.getMonth(), currentDate.getDay()); // startDate limited by retirement age
    this.startDateMax = new Date(currentDate.setMonth(currentDate.getMonth() + 1 )); // add date upto 1 month ahead
    this.errorMessages = {
      required: 'Please fill in field.',
      minlength: 'Requires a minimum of 2 characters',
      min: 'Minimum age ' + this.ageMin + ' years.',
      max: 'Maximum age ' + this.ageMax + ' years',
      matDatepickerMin: 'Please pick a date after ' + Utils.formattedDate(this.startDateMin),
      matDatepickerMax: 'Please pick a date before ' + Utils.formattedDate(this.startDateMax),
    };
  }

  private generateForm() {
    if (this.serviceName === 'Employee') {
      this.editorForm = this.fb.group({
        id: [
          this.record.id,
          [
            Validators.required
          ]
        ],
        name: [
          this.record.name,
          [
            Validators.required,
            Validators.minLength(2), 
            Validators.pattern('[a-zA-Z ]*')
          ]
        ],
        lastname: [
          this.record.lastname,
          [
            Validators.required,
            Validators.minLength(2), 
            Validators.pattern('[a-zA-Z ]*')
          ]
        ],
        age: [
          this.record.age,
          [
            Validators.required,
            Validators.minLength(2), 
            Validators.min(this.ageMin), 
            Validators.max(this.ageMax)
          ]
        ],
        startDate: [
          this.datePipe.transform(this.record.startDate, 'yyyy-MM-dd'),
          [
            Validators.required
          ]
        ],
        department: [
          this.record.department,
          [
            Validators.required
          ]
        ]
      })
    } else {
      this.editorForm = this.fb.group({
        id: [
          this.record.id,
          [
            Validators.required
          ]
        ],
        name: [
          this.record.name,
          [
            Validators.required,
            Validators.minLength(2), 
            Validators.pattern('[a-zA-Z ]*')
          ]
        ]
      })
    }

  }

  cancel(): void {
    this.dialogRef.close();
  }

  errors(control: any): string[] {
    return control.errors ? Object.keys(control.errors) : [];
  }

}