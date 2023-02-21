import { authRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
	declarations: [
		LoginComponent,
		SignUpComponent
	],
	imports: [
		CommonModule,
    RouterModule.forChild(authRoutes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule


	],
  exports:[
    LoginComponent,
    SignUpComponent,
  ]

})

export class AuthModule{}
