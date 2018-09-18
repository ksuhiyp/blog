import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService, Token } from './auth.service'
import { LoggerService } from '../logger.service';

export interface User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messages;
  logged = undefined;

  constructor(private auth: AuthService, public dialogRef: MatDialogRef<any>, private logger: LoggerService) { }

  ngOnInit() {

  }
  model: User = { email: '', password: '' }

  onSubmit() {
    // TODO:Service to hit HTTP req on post://api/user/login

    this.auth.getToken(this.model)
      .subscribe((data) => {
        if (data.token != '') {
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('User', JSON.stringify(data.user));
          this.logged = true;
          this.dialogRef.close()

        }
        else {
          this.logged = false;
          this.messages = this.logger.messages
        }

      })
  }





}
