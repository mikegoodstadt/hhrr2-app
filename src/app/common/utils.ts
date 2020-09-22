import { KeyValue } from '@angular/common';

export class Utils {

  public static originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
  return 0;
  }

  public static formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${day}/${month}/${year}`;
  }

}