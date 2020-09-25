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
    record.id = this.idService.generate();
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
    let recs;
    this.dataService.records(this.recordType).subscribe(r => recs = r);
    return recs;
  }

  // UPDATE
  public update(recordsArray?: T[]): boolean {

    return true;
  }

  // DELETE
  public delete(record: T): boolean {

    return true;
  }

}
