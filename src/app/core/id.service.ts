import { Injectable } from '@angular/core';
import { Utils } from '@app/shared/utils';
@Injectable({
  providedIn: 'root'
})
export class IdService {
  public idCache: bigint[] = [];

  constructor() {}

  public idExists(id: bigint): boolean {
    return this.idCache.includes(id);
  }

  public isValid(id: any): boolean {
    return typeof(id) === 'bigint';
  }

  public generate(): bigint {
    let isUnique = false;
    let nextId: bigint = this.idCache[this.idCache.length-1];
    let count = 0;
    // Find next sequential unique Id.
    while (!isUnique) {
      if (count >= 1000) break;
      count++;
      nextId = nextId++;
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
        nextId = BigInt(Utils.randBetween(0,999));
        if (!this.idExists(nextId)) {
          isUnique = true;
        }
      }  
    }
    // If still none is found after 10 random attempts, return zero and warn.
    if (!isUnique) {
      nextId = BigInt(0);
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
    this.idCache.sort( (a, b) => a < b ? -1 : 1 );
  }

  public release(id: bigint): void {
    const index = this.idCache.indexOf(id);
    this.idCache.splice(index, 1);
  }

}
