import { Injectable } from '@angular/core';
import { Utils } from '@app/shared/utils';
@Injectable({
  providedIn: 'root'
})
export class IdService {
  public idCache: number[] = [];
  private minId = 0;
  private maxId = 100000;

  constructor() {}

  // CREATE
  public generate(): number {
    let isUnique = false;
    let nextId: number = this.idCache[this.idCache.length-1];
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
        nextId = Utils.randBetween(this.minId, this.maxId);
        if (!this.idExists(nextId)) {
          isUnique = true;
        }
      }  
    }
    // If still none is found after 10 random attempts, return zero and warn.
    if (!isUnique) {
      nextId = 0;
      console.log('No Unique ID found - increase number of attempts of assign manually.')
    }
    return nextId;
  }

  // READ
  public isValid(id: any): boolean {
    return (typeof(id) === 'number' && (id > this.minId && id < this.maxId)) ? true : false;
  }

  public idExists(id: number): boolean {
    return this.idCache.includes(id);
  }

  // UPDATE
  public cache(idArray: number[]): void {
    for (const id of idArray) {
      if (this.isValid(id) && !this.idExists(id)) {
        this.idCache.push(id);
      } else {
        // console.log('Duplicate ID: ', id);
      }
    }
    this.idCache.sort( (a, b) => a < b ? -1 : 1 );
  }

  // DELETE
  public release(id: number): void {
    const index = this.idCache.indexOf(id);
    this.idCache.splice(index, 1);
  }

}
