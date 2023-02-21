import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { NewAccountComponent } from 'src/app/trader/dialogs/new-account/new-account.component';


@Component({
  selector: 'app-navbar-material',
  templateUrl: './navbar-material.component.html',
  styleUrls: ['./navbar-material.component.css']
})

export class NavbarMaterialComponent  {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  user:any
  content
  accounts
  
  constructor(public dialog:MatDialog ,public router: Router ,private _auth: AuthService, private _snackBar:MatSnackBar){
    this.user = this._auth.getUserFromLocalStorage();
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result)
        this.router.navigate['/home'];
        window.location.reload()

      }
    }).closed;
    

    
  }


}
