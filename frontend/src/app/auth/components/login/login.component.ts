import { AuthService } from './../../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = []
  loginForm = this._formBuilder.group({
    email:['', [Validators.required,Validators.email]],
    password:['', Validators.required]
  })

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private router:  Router, private _snackBar:MatSnackBar) { }
 // TODO: AGREGAR DETALLES DE SPINNER EN EL LOGIN/
 //TODO: Agregar metodo para SIGNUP darse de alta
  ngOnInit(): void {
  }
// TODO: agregar esto en los compinentes que utilicen susbripciones
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe);

  }

  onLogin(): void{
    const formValue = this.loginForm.value;
    this._authService.login(formValue).subscribe((res)=>{

      if(res){
        this._snackBar.open( 'Iniciando','',{
          duration: 2*1000
        });
        this.router.navigate(['']);
      }
    },(e)=>{
      this._snackBar.open( 'ERROR: ','Email o Contrasena incorrectos',{
        duration: 5*1000
      });
    })

  }

 

  redirectToSignUp(): void {
    this.router.navigateByUrl('/signup');
  }

}
