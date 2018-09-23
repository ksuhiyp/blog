import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  loggedInUser;
  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));

    console.log(this.loggedInUser)

  }
  openDialog(): void {
    if (this.loggedInUser) {
      return
    }
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loggedInUser = localStorage.getItem('User');
    });
  }


  closeDialog() {
    this.dialog.closeAll()
  }
  logout() {
    this.loggedInUser = null;
    localStorage.clear();

  }
}
