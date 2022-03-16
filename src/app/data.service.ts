import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiKey = '3a5b464439a6479cbc8087146192bae6';
  constructor(private http: HttpClient) { }

  getData(category: any): Observable<any> {
    let params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('category', category);

    return this.http.get('https://newsapi.org/v2/sources', { params });
  }
}
