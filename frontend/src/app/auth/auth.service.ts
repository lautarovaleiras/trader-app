import { INewUser, IUser, IUserResponse } from './../shared/models/User.interface';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {catchError,map} from 'rxjs/operators'
import {JwtHelperService} from '@auth0/angular-jwt'
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
const jwt = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  URL = environment.backend_url;
  constructor(private http: HttpClient, private _route: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(auth_data: IUser):Observable<any|void>{
    return this.http.post<IUserResponse>(`${this.URL}/login`,auth_data)
      .pipe(
        map((res)=>{
         this.saveToken(res.token);
         this.loggedIn.next(true);
         return res;
        }),
        catchError((err) => this.handleError(err))
      );
  }
  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.loggedIn.next(false);
    this._route.navigate(['login'])
  }
// TODO: tipar respuesta
  signUp(new_user: INewUser): Observable<any>{
    return this.http.post<any>(`${this.URL}/users`,new_user)
      .pipe(
        map((res)=>{
         console.log(res)
         return res;
        }),
        catchError((err) => this.handleError(err))
      );


  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = jwt.isTokenExpired(userToken);
    console.log('tokenisExpired', isExpired)
    isExpired? this.logout() : this.loggedIn.next(true);


  }
  private saveToken(token: string): void {
    localStorage.setItem('token',token);
    this.saveUserData(token);
  }

  private saveUserData(token: string): void {
    let user_data:any = jwt_decode.default(token);
    localStorage.setItem('user_data',JSON.stringify(user_data));
  }

  getUserFromLocalStorage():any{
    return JSON.parse(localStorage.getItem('user_data'))
  }

  private handleError(err): Observable<any>{
    let error = 'An Error Ocurred';
    if (err)
      error = `Error: code${err.message}`
      console.log(error)
    return throwError(error);
  }
}
