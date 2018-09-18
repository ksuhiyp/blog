import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { LoggerService } from '../logger.service';


export interface Token {
  token: string;
}
export interface User {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private logger: LoggerService) { }

  url = 'http://localhost:3000/users/login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getToken(User): Observable<Token> {
    return this.http.post<Token>(this.url, User, this.httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError('getJWT', { token: '' }))
      )

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(err); // log to console instead
      this.logger.add(err)
      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
