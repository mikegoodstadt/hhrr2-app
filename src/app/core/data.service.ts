import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  public records(type: string): Observable<any> {
    const url = '/api/' + type.toLowerCase() + 's';
    return this.http.get(url).pipe(
      map(res => {
        let date = res['startDate']
        if (date) date = new Date(date);
        return res;
      })
    );
  }

  public record(type: string, id: number): Observable<any> {
    const url = '/api/' + type.toLowerCase() + 's' + '/' + id;
    return this.http.get(url).pipe(
      map(res => {
        let date = res['startDate']
        if (date) date = new Date(date);
        return res;
      })
    );
  }

  public add(type: string, record: any) {
    console.log('adding');
    const url = '/api/' + type.toLowerCase() + 's';
    return this.http.post(url, JSON.stringify(record), httpOptions).pipe(
      // retry(1),
      catchError(this.handleError<any[]>(type, 'add'))
    );
  }

  public update(type: string, record: any) {
    console.log('updating');
    const url = '/api/' + type.toLowerCase() + 's' + '/' + record.id;
    return this.http.put(url, JSON.stringify(record), httpOptions).pipe(
      // retry(1),
      catchError(this.handleError<any[]>(type, 'update'))
    );
  }

  public delete(type: string, id: number) {
    const url = '/api/' + type.toLowerCase() + 's' + '/' + id;
    console.log('data deleting...', url);
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
  
}
