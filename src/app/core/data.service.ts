import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  public records(type: string): Observable<any> {
    const path = '/api/' + type.toLowerCase() + 's';
    return this.http.get(path);
  }

  public record(id: number): Observable<any> {
    console.log('item id', id);
    const path = '/api/' + id;
    return this.http.get(path);
  }

}
