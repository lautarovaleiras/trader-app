import { AccountService } from './../../../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountComponent } from '../../dialogs/new-account/new-account.component';
import { BuyDialogComponent } from '../../dialogs/buy-dialog/buy-dialog.component';
import  {currencies} from '../../../shared/currencies';
import {filter,find, toUpper} from 'lodash';
import { Subscription } from 'rxjs';
import { error } from 'selenium-webdriver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []
  loading: boolean = true;
  accounts = []
  constructor(private _accountService: AccountService, public dialog:MatDialog ,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe);
  }

  loadAccounts(){
    this.loading = true;
    this._accountService.getAccountsByUserId().subscribe((res) =>{
      this.accounts = res;
      this.accounts.forEach(acc => {
        let account_detail = find(currencies,{currencyISO:acc.type});
        Object.assign(acc,account_detail)
      });
      this.loading = false;
    },(e)=>{
      this._snackBar.open('ERROR: ', toUpper(e.error.message), {
        duration: 5 * 1000
      })
    }).closed;

  }


  openDialog(account_id: number, type:string): void {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '250px',
      data: {account_id,type}

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.loadAccounts();
    });
  }
  
}
