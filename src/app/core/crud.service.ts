import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IdService } from './id.service';
import { DataService } from './data.service';
import { Record } from './record.model';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends Record> {
  private recordsStream: BehaviorSubject<T[]>;
  public recordType: string;
  public stored: boolean;
  public multiple: boolean;
  private initialized: boolean;
  private ctor: { new(): T };

  constructor(
    ctor: { new(): T },
    public idService: IdService,
    public dataService: DataService,
    ) {
    this.ctor = ctor;
    this.recordsStream = new BehaviorSubject<T[]>(null);
    this.recordType = ctor.name;
    this.multiple = false;
    this.stored = false;
  }

  // INIT
  public init(recordsArray?: T[]): Promise<boolean> {
    this.initialized = this.initialized || false;
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      if (this.initialized) {
        resolve(this.initialized);
      } else {
        recordsArray = recordsArray || this.dataService.getData(this.recordType) ;
        recordsArray = this.update(recordsArray);
        this.initialized = true;
        resolve(this.initialized)
      }
    });
    return promise;
  }

  // CREATE
  public create(props?: T): T {
    if (props) Object.keys(props).forEach((key) => (props[key] == null) && delete props[key]);
    let record = this.model;
    record.id = this.idService.generate();
    return Object.assign(record, props);
  }

  // READ
  public get model(): T {
    return new this.ctor();
  }

  public get records(): Observable<T[]> {
    return this.recordsStream.asObservable();
  }

  public getRecordsAll(): T[] {
    return this.recordsStream.value;
  }

  // UPDATE
  public update(recordsArray?: T[]): T[] {
    recordsArray = recordsArray || this.recordsStream.value || [];
    if (!recordsArray.length) {
      const record = this.create();
      recordsArray.push(record);
    }
    this.recordsStream.next(recordsArray);
    const ids: bigint[] = recordsArray.map(vals => vals.id);
    this.idService.cache(ids);
    return recordsArray;
  }

  public updateRecord(record: T): void {
    record.id = record.id || this.idService.generate();
    let recordsArray = this.recordsStream.value;
    const index = recordsArray.findIndex(rec => rec.id === record.id);
    if (index < 0) {
      recordsArray = [ ...this.recordsStream.value, record ];
    } else {
      recordsArray.splice(index, 1, record);
    }
    this.update(recordsArray);
  }

  // DELETE
  public delete(record: T): void {
    const recordsArray: T[] = this.recordsStream.value.filter(rec => rec.id !== record.id);
    this.idService.release(record.id);
    this.update(recordsArray);
  }

}
