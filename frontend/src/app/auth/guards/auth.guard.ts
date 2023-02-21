import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//TODO: REVISAR SI ES NECESARIO CREAR UNAUTHGUARD
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this._authService.isLogged.pipe(
      // Toma el  primer valor del observable
      take(1),
      map((isLogged: boolean)=> !isLogged)
    );
  }

}
