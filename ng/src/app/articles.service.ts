import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { LoggerService } from './logger.service';
import { log } from 'util';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getAllArticles(): Observable<article[]> {
    //check if logged in

    
    const url = 'http://localhost:3000/articles'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(localStorage.getItem('token') )
      })
    }

    return this.http.get<article[]>(url, httpOptions).pipe(tap(data => console.log(data)))

  }
  getArticleById(id: string): Observable<article> {

    const url = 'http://localhost:3000/articles/' + id
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(localStorage.getItem('token') )
      })
    }

    return this.http.get<article>(url, httpOptions)
      .pipe(tap(data => console.log(data)));
  }
  deleteArticleById(id: string):Observable<{}> {
    const url = 'http://localhost:3000/articles/' + id
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(localStorage.getItem('token') )
      })
    }

   return this.http.delete(url, httpOptions).pipe(tap(data => console.log(data)));

  }


}

export interface tags {
  _id: string;
  title: string;
}
export interface categories {
  _id: string;
  title: string;
}
export interface article {
  _id:string;
  title: string;
  body: string;
  author: string;
  tags: tags;
  categories: categories;
  create_date: Date;
  last_update: string;
  description: string;
  article_images: string;
  body_images: string;
}