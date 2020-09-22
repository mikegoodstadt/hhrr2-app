import { Pipe, PipeTransform } from '@angular/core';
import bigInt from 'big-integer';

@Pipe({
  name: 'bigintString'
})
export class BigintString implements PipeTransform {

  /**
   * Converts bigint to string
   * @param bigint string
   */
  transform(bigint: bigint): string {
    // console.log(bigint);
    const largeNumber = bigInt(bigint);
    return largeNumber.toString();
  }

}
