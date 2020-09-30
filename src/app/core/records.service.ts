import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Record } from './record.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generic CRUD Serivce
 */
@Injectable({
  providedIn: 'root'
})
export abstract class RecordsService<T extends Record> {
  private ctor: { new(): T };

  constructor(
    ctor: { new(): T },
    public dataService: DataService<T>,
    ) {
    this.ctor = ctor;
  }

  /**
   * Get model as object.
   * @returns new Object
   */
  public get model(): T {
    return new this.ctor();
  }

  /**
   * Find largest id and add 1.
   * Promise to make Frontend wait.
   */
  private newId(): Promise<number> {
    return this.getIdList().pipe(
      map(ids => ids.reduce((largest, test) => ((test >= largest) ? test : largest), 0) ),
      map(id => id + 1)
    ).toPromise();
  }

  /**
   * Create new Record from model with new Id.
   * @param props If any changes are required to model - currently not used in App.
   */
  public async new(props?: T): Promise<T> {
    if (props) Object.keys(props).forEach((key) => (props[key] == null) && delete props[key]);
    let record = this.model;
    record.id = await this.newId();
    return Object.assign(record, props);
  }
  /**
   * Request to ADD Record to data source.
   * @param record Record to be added.
   */
  public add(record: T): boolean {
    this.dataService.add(this.model.recordType, record).subscribe();
    return true;
  }

  /**
   * Provide all records from data service.
   * @returns Observable Array of Records
   */
  public get records(): Observable<T[]> {
    return this.dataService.records(this.model.recordType);
  }

  /**
   * Get a single record from data service.
   * @param ref  Record id / name, default of "1".
   * @returns Observable sinle Record
   */
  public getRecord(ref: number | string = 1): Observable<T> {
    let type = (typeof(ref) === 'string') ? 'name' : 'id';
    return this.records.pipe( map(recs => recs.find(rec => (rec[type] === ref)) ));
  }

  /**
   * Get list of Record Ids.
   * @param name  Record name or null
   * @returns Observable Array of id Numbers
   */
  public getIdList(name: string = ''): Observable<number[]> {
    return this.records.pipe(
      map(recs => recs.filter(rec => {
        return (name) ? rec.name.toLowerCase() === name : true;
      }).map(rec => rec.id))
    );
  }

  /**
   * Generate basic list of Record names.
   * @returns Observable Array of strings
   */
  public get nameList(): Observable<string[]> {
    return this.records.pipe( map(recs => recs.map(rec => rec.name)) );
  }

  /**
   * Generate Material Select Options.
   * @param key Key name for selection
   * @returns Map of key by record.id
   */
  public getSelectOptions(key: string = 'name'): Observable<Map<number, string>> {
    return this.records.pipe(map(recs => recs.reduce(
      (opts: Map<number, string>, rec: T) => opts.set(rec.id, rec[key]), new Map)
    ));
  }

  /**
   * Request to UPDATE Record in data source.
   * @param record Record to be added.
   */
  public update(record: T): void {
    this.dataService.update(this.model.recordType, record).subscribe();
  }

  /**
   * Request to DELETE Record from data source.
   * @param record Record to be added.
   */
  public delete(record: T): void {
    this.dataService.delete(this.model.recordType, record).subscribe();
  }

}
