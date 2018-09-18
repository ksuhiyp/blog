import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { LoggerService } from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<article[]> {
    //check if logged in
    const url = 'http://localhost:3000/articles'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.get<article[]>(url, httpOptions).pipe(tap(data=>console.log(data)))

  }
  // getArticleById(): Observable<article> {
  //   return article
  // }


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