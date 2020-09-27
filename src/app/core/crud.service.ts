import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { DataService } from './data.service';
import { Record } from './record.model';
import { SelectOption } from '@app/shared/select-options.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends Record> {
  public recordType: string;
  private ctor: { new(): T };

  constructor(
    ctor: { new(): T },
    public dataService: DataService,
    ) {
    this.ctor = ctor;
    this.recordType = ctor.name;
  }

  // CREATE
  public async new(props?: T): Promise<T> {
    if (props) Object.keys(props).forEach((key) => (props[key] == null) && delete props[key]);
    let record = this.model;
    record.id = await this.newId();
    return Object.assign(record, props);
  }

  public add(record: T): boolean {
    this.dataService.add(this.recordType, record).subscribe(res => console.log(res));;
    return true;
  }

  // READ
  public get model(): T {
    return new this.ctor();
  }

  public get records(): Observable<T[]> {
    return this.dataService.records(this.recordType);
  }

  public getRecord(ref: number | string = 1): Observable<T[]> {
    let type = (typeof(ref) === 'string') ? 'name' : 'id';
    return this.dataService.records(this.recordType).pipe(
      map(recs => recs.filter(rec => rec[type] === ref)[0])
    );
  }

  public get idList(): Observable<number[]> {
    return this.records.pipe( map(recs => recs.map(rec => rec.id)) );
  }
  
  public get nameList(): Observable<string[]> {
    return this.records.pipe( map(recs => recs.map(rec => rec.name)) );
  }

  public getSelectOptions(key: string = 'name'): Observable<SelectOption[]> {
    return this.records.pipe(map(recs => recs.reduce(
      (opts: SelectOption[], rec) => [...opts, {value: rec.id, viewValue: rec[key]}], [])
    ));
  }
  public getSelectOptionsMap(key: string = 'name'): Observable<Map<number, string>> {
    return this.records.pipe(map(recs => recs.reduce(
      (opts: Map<number, string>, rec: T) => opts.set(rec.id, rec[key]), new Map)
    ));
  }

  private newId(): Promise<number> {
    return this.idList.pipe(
      map(ids => ids.reduce((a, b) => ((a >= b) ? a : b), 0) ),
      map(id => id + 1),
      take(1)
    ).toPromise();
  }

  // UPDATE
  public update(record: T): boolean {
    this.dataService.update(this.recordType, record).subscribe(res => console.log(res));;
    return true;
  }

  // DELETE
  public delete(record: T): boolean {
    this.dataService.delete(this.recordType, record.id).subscribe(res => console.log(res));
    return true;
  }

}
