import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Record } from './record.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService<T extends Record> {
private apiUrl = environment.apiUrl;
private apiExt = environment.apiExt;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Fetch distinct record collections from data source.
   * @param type Record type
   */
  public records(type: string): Observable<T[]> {
    type = this.getType(type);
    const url = `${this.apiUrl}/${type}${this.apiExt}`;
    return this.http.get<T[]>(url).pipe(
      map(res => res.map(rec => {
        if (rec['startDate']) {
          let date = rec['startDate']
          rec['startDate'] = new Date(date);
        };
        return rec;
      }),
      catchError(this.handleError<T[]>(type, 'records'))
    ));
  }

  /**
   * Fetch single record from data source.
   * @param type Record type
   * @param id Record reference id
   */
  public record(type: string, record: any): Observable<T> {
    type = this.getType(type);
    const url = `${this.apiUrl}/${type}/${record.id}${this.apiExt}`;
    return this.http.get<T>(url).pipe(
      map(rec => {
        if (rec['startDate']) {
          let date = rec['startDate']
          if (date) date = new Date(date);
        };
        return rec;
      }),
      catchError(this.handleError<T>(type, 'record'))
    );
  }

  /**
   * POST new record to data source.
   * @param type Record type
   * @param record complete Record
   */
  public add(type: string, record: any) {
    type = this.getType(type);
    const url = `${this.apiUrl}/${type}${this.apiExt}`;
    return this.http.post(url, JSON.stringify(record), httpOptions).pipe(
      // retry(1),
      catchError(this.handleError<any[]>(type, 'add'))
    );
  }

  /**
   * PUT updated record to data source.
   * @param type Record type
   * @param record complete Record
   */
  public update(type: string, record: any) {
    type = this.getType(type);
    const url = `${this.apiUrl}/${type}/${record.id}${this.apiExt}`;
    return this.http.put(url, JSON.stringify(record), httpOptions).pipe(
      // retry(1),
      catchError(this.handleError<any[]>(type, 'update'))
    );
  }

  /**
   * DELETE record to data source.
   * @param type Record type
   * @param id Record id
   */
  public delete(type: string, record: any) {
    type = this.getType(type);
    const url = `${this.apiUrl}/${type}/${record.id}${this.apiExt}`;
    return this.http.delete(url, httpOptions).pipe(
      // retry(1),
      catchError(this.handleError<any[]>(type, 'delete'))
    );
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(serviceName = '',  operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;
      console.log(`${serviceName}: ${operation} failed: ${message}`);
      return of(result);
    };
  }
  
  private getType(type: string): string {
    return type + 's';
  }

}
