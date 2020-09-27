import { Record } from '@app/core/record.model';

export class Setting extends Record {
  ageMin: number;
  ageMax: number;

  constructor() {
    super();
    this.ageMin = 16;
    this.ageMax = 65;
  }

}
