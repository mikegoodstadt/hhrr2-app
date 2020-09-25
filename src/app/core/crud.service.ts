import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IdService } from './id.service';
import { DataService } from './data.service';
import { Record } from './record.model';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends Record> {
  public recordType: string;
  private ctor: { new(): T };

  constructor(
    ctor: { new(): T },
    public idService: IdService,
    public dataService: DataService,
    ) {
    this.ctor = ctor;
    this.recordType = ctor.name;
  }

  // CREATE
  public create(props?: T): T {
    if (props) Object.keys(props).forEach((key) => (props[key] == null) && delete props[key]);
    let record = this.model;
    record.id = this.getId();
    return Object.assign(record, props);
  }

  // READ
  public get model(): T {
    return new this.ctor();
  }

  public get records(): Observable<T[]> {
    return this.dataService.records(this.recordType);
  }

  public getRecords(): T[] {
    let records: T[];
    this.dataService.records(this.recordType).subscribe(recs => records = recs);
    return records;
  }

  public getId(): number {
    const idList: number[] = this.getRecords().map(rec => rec.id);
    this.idService.cache(idList);
    return this.idService.generate();
  }

  // UPDATE
  public update(record: T): boolean {
    this.dataService.update(this.recordType, record.id);
    return true;
  }

  // DELETE
  public delete(record: T): boolean {
    console.log('crud deleting...');
    this.dataService.delete(this.recordType, record.id);
    return true;
  }

}
