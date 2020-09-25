import { KeyValue } from '@angular/common';

export class Utils {

  /**
   * Keyorder Pipe modifier forcing odering by arrray index.
   * @param a KeyValue<number, string>
   * @param b KeyValue<number, string>
   */
  public static originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  /**
   * Reorder date by Endianness
   * or just use: new Intl.DateTimeFormat('es-ES').format(date)
   * @param date Date value to be converted
   * @param end  Ordering as big-, middle- or little-endian.
   * @param sep  Charater between ordered values.
   * @returns returns formatted date as string e.g. "dd/MM/yyyy"
   */
  public static formattedDate(date = new Date, end: "B" | "M" | "L" = "L", sep: string = "/"): string {
    let d: string[] = ["dd", "mm", "yyyy"];
    d.push( String( date.getDate() ) );
    d.push( String( date.getMonth() + 1 ) );
    d.push( String( date.getFullYear() ) );
    d.forEach(v => (v.length < 2) ? '0' + v : v);
    d = (end === "B") ? d.reverse() : d ;
    d = (end === "M") ? [d[1], d[0], d[2]] : d;
    return `${d[0]}${sep}${d[1]}${sep}${d[2]}`;
  }

  /**
   * Generate a random number between two values.
   * @param min lower bound inclusive
   * @param max upper bound inclusive
   * @returns Returns a random number between min and max.
   */
  public static randBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}