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

    const url = 'http://localhost:3000/tags'
    return this.http.get<Tag[]>(url).pipe(map(z => z.Result)
  }
}
