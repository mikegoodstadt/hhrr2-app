import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '@app/settings/settings.service';
import { DepartmentService } from '@app/departments/department.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/shared/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { SelectOption } from '@app/shared/select-options.interface';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [ DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
 ],
})
export class EditorComponent implements OnInit, OnDestroy {
  public record: any;
  public recordType: string;
  public departments: Observable<string[]>;
  // public departmentOptions: Observable<SelectOption[]>;
  public departmentOptions: Observable<Map<number, string>>;
  private subscription = new Subscription();

  private settings: any;
  private ageMin: number = 16;
  private ageMax: number = 65;
  public startDateMin: Date;
  public startDateMax: Date;
  public errorMessages = {};

  constructor(
    public dialogRef: MatDialogRef<EditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stgsService: SettingsService,
    public deptService: DepartmentService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    ) {
      this.record = this.data.record;
      this.recordType = data.recordType;
    }
    
  public editorForm: FormGroup;
    
  ngOnInit(): void {
    this.getSettings();
    this.getDepartments();
    this.setErrorMessages();
    this.generateForm();
  }

  private getSettings() {
    const settingsSubscribed = this.stgsService.getRecord().subscribe(stgs => {
      console.log(stgs);
      console.log(stgs[0]);
      this.settings = stgs[0];
      console.log(this.settings);
    });
    this.subscription.add(settingsSubscribed);
  }

  private getDepartments() {
    // this.departmentOptions = this.deptService.getSelectOptions();
    this.departmentOptions = this.deptService.getSelectOptionsMap();
  }

  /**
   * Error Messages
   * @prop required Required field
   * @prop minLength Minimum working age from Settings
   * @prop min Minimum working age from Settings
   * @prop max Minimum working age from Settings
   * @prop startDateMin Date limited by retirement age
   * @prop startDateMax Increase date upto 1 month ahead
   */
  private setErrorMessages() {
    const currentDate = new Date();
    this.startDateMin = new Date(currentDate.getFullYear() - this.ageMax, currentDate.getMonth(), currentDate.getDay());
    this.startDateMax = new Date(currentDate.setMonth(currentDate.getMonth() + 1 ));
    this.errorMessages = {
      required: 'Please fill in field.',
      minlength: 'Requires a minimum of 2 characters',
      min: 'Minimum age ' + this.ageMin + ' years.',
      max: 'Maximum age ' + this.ageMax + ' years',
      matDatepickerMin: 'Please pick a date after ' + new Intl.DateTimeFormat('es-ES').format(this.startDateMin),
      matDatepickerMax: 'Please pick a date before ' + new Intl.DateTimeFormat('es-ES').format(this.startDateMax),
    };
  }

  private generateForm() {
    if (this.recordType === 'Employee') {
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
            Validators.required,
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}