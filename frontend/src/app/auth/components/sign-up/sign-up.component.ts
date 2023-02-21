import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = []
  signUpForm = this._formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['', [Validators.required,Validators.email]],
    password:['', Validators.required]
  })

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private router:  Router, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub=>sub.unsubscribe);

  }

  onSignUp(){
    const formValue = this.signUpForm.value;
    this._authService.signUp(formValue).subscribe((res)=>{
      if(res){
        this._snackBar.open( 'Registro exitoso!!','',{
          duration: 4*1000
        })
        this.router.navigate(['/login']);
      }
    },(error)=>{
      this._snackBar.open( 'ERROR: ','Algunos de los datos son incorrectos o ese email ya existe',{
        duration: 5*1000
      });
    })
  }

}
