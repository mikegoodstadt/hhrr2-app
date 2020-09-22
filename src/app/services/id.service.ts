import { Injectable } from '@angular/core';
import bigInt from 'big-integer';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  public idCache: bigInt.BigInteger[] = [];

  constructor() {}

  public idExists(id: bigInt.BigInteger): boolean {
    return this.idCache.includes(id);
  }

  public isValid(id: any): boolean {
    return bigInt.isInstance(id);
  }

  public generate(): bigInt.BigInteger {
    let isUnique = false;
    let nextId: bigInt.BigInteger = this.idCache[this.idCache.length-1];
    let count = 0;
    // Find next sequential unique Id.
    while (!isUnique) {
      if (count >= 1000) break;
      count++;
      nextId = bigInt(nextId).next();
      if (!this.idExists(nextId)) {
        isUnique = true;
      }
    }
    // If no sequential nextId found after 1000 attempts, try a random generated nextId
    if (!isUnique) {
      count = 0;
      while (!isUnique) {
        if (count >= 10) break;
        count++;
        nextId = bigInt.randBetween(bigInt(),bigInt(999));
        if (!this.idExists(nextId)) {
          isUnique = true;
        }
      }  
    }
    // If still none is found after 10 random attempts, return zero and warn.
    if (!isUnique) {
      nextId = bigInt();
      console.log('No Unique ID found - increase number of attempts of assign manually.')
    }
    return nextId;
  }

  public cache(idArray: any[]): void {
    for (const id of idArray) {
      if (!this.idExists(id)) {
        this.idCache.push(id);
      } else {
        // console.log('Duplicate ID: ', id);
      }
    }
    this.idCache.sort( (a, b) => bigInt(a).compare(b) );
  }

  public release(id: bigInt.BigInteger): void {
    const index = this.idCache.indexOf(id);
    this.idCache.splice(index, 1);
  }

}
