import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IEditAccount, INewAccount } from '../shared/models/Account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  URL = environment.backend_url
  constructor(private http:HttpClient) { }
  // TODO: obtener token del localStorage o crear un interceptor
  token = localStorage.getItem('token');
  headers: HttpHeaders = new HttpHeaders(`auth: ${this.token}`);
  user = JSON.parse(localStorage.getItem('user_data'));

  getAllAccounts(){
    return this.http.get(`${this.URL}/accounts`);
  }

  createAccount(currency_type: string){
    let new_account :INewAccount = {
      type:currency_type,
      user_id:this.user.userId
    }
    return this.http.post(`${this.URL}/accounts`,new_account,{headers:this.headers});

  }
  editAccount(data: {typeAccount,amount,account_id}){
    let buy_currency :IEditAccount = {
      type:data.typeAccount,
      amount:data.amount,
      user_id:this.user.userId
    }
    return this.http.put(`${this.URL}/accounts/${data.account_id}`,buy_currency,{headers:this.headers});

  }

  
  public getAccountsByUserId(): Observable<any>{
  
  
  // headers.append('authorization',`Barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoibGF1dGFyby52YWxlaXJhc0BnbWFpbC5jb20iLCJpYXQiOjE2MTg3OTQ2MTcsImV4cCI6MTYxODc5ODIxN30.KIOHVKSC68INP6Gf-AJkRIHyvFhBR4zKkTpxF9V0py8`)
    return this.http.get(`${this.URL}/accounts/user/${this.user.userId}`,{headers:this.headers});
  }


}
