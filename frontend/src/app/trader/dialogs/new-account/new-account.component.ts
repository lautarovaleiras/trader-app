import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { toUpper } from "lodash";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { AccountService } from "src/app/services/account.service";
import {currencies} from '../../../shared/currencies';

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"]
})
export class NewAccountComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  accountForm = this._formBuilder.group({
    type: ["", Validators.required]
  });
  // JSON DE fixer.io
  // currency_types = ["AED","AFN","ALL","AMD","ANG","AOA","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND",
  //   "BOB","BRL","BSD","BTC","BTC","BTC","BTC","BSD","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC",
  //   "CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF",
  //   "GTQ","GYD","HKD","HNL","HRK","HTG", "HUF","IDR", "ILS", "IMP", "INR", "IQD", "IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS",
  //   "KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT",
  //   "MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO",  "NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN",
  //   "PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB",
  //   "TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD",
  //   "XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];

  currency_types = currencies;

  constructor(
    private _snackBar:MatSnackBar,
    private _accountService: AccountService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const formValue = this.accountForm.value;
    this._accountService.createAccount(formValue.type).subscribe((res:any) => {
      if (res) {
        this._snackBar.open('Caja creada: ',res.id, {
          duration: 5 * 1000
        })
        
        this.dialogRef.close(res);
      }
    }, (e) => {
      this._snackBar.open('ERROR: ', toUpper(e.error.message), {
        duration: 5 * 1000
      })
      this.dialogRef.close();
    }).closed;
  }

}
