import { Record } from '@app/core/record.model';

export class Department extends Record {

  constructor() {
    super();
    this.recordType = 'department';
    this.name = 'Default Department';
  }

}
