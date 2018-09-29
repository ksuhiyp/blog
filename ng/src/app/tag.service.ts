import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Tag } from './create-article/create-article.component';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  searchTerm(term: string): Observable<Tag[]> {

    if (!term.trim())
      return of([]);
    const query = '?title='
    const url = 'http://localhost:3000/tags' + query + term

    return this.http.get<{ Result: Tag[] }>(url).pipe(map(data => data.Result))
  }

  upsertTerm(tag: Tag): Observable<Tag> {
    const url = 'http://localhost:3000/tags'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(localStorage.getItem('token'))
      })
    }
    return this.http.put<Tag>(url, tag, options)
  }
}
