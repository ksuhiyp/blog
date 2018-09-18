import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

   messages: string[];

  add(message: string) {
    this.clear()
    this.messages.push(message)
  }

  clear() {
    this.messages = [];
  }

 

}
