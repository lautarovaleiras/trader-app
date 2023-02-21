import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toUpper } from 'lodash';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css']
})
export class BuyDialogComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  accounts = []

  accountForm = this._formBuilder.group({
    typeAccount: ["", Validators.required],
    amount: ["", Validators.required]
  });

  constructor(
    private _snackBar: MatSnackBar,
    private _accountService: AccountService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { account_id: number, type: string }
  ) { }


  ngOnInit(): void {
    this._accountService.getAccountsByUserId().subscribe((res) => {
      this.accounts = res;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe);

  }

  onSubmit(): void {

    const formValue = this.accountForm.value;
    let buy_currency = {
      typeAccount: this.data.type,
      amount: formValue.amount,
      account_id: formValue.typeAccount
    }
    if (this.data.type === "ARS")
      buy_currency.account_id = this.data.account_id
    this._accountService.editAccount(buy_currency).subscribe((res:any) => {
      if (res) {
        this._snackBar.open('Moneda comprada', res.type, {
          duration: 5 * 1000
        })
        this.dialogRef.close(res);
      }
    }, (e) => {
      this._snackBar.open('ERROR: ', toUpper(e.error.message), {
        duration: 5 * 1000
      })
      this.dialogRef.close();
    }).closed
  }

}
