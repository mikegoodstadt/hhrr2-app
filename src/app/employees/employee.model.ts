import { Record } from '@app/core/record.model';

export class Employee extends Record {
  lastname: string;
  age: number;
  startDate: Date;
  department: number;

  constructor() {
    super();
    this.name = 'Name';
    this.lastname = 'Lastname';
    this.age = 23;
    this.startDate = new Date();
    this.department = 2;
  }

}
