import { Record } from '@app/core/record.model';

export class Employee extends Record {
  lastname: string;
  age: number;
  startDate: Date;
  department: number;

  constructor() {
    super();
    this.recordType = 'employee';
    this.name = 'Default Name';
    this.lastname = 'Default Lastname';
    this.age = 23;
    this.startDate = new Date();
    this.department = 2;
  }

}
