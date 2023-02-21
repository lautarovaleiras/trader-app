import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { TraderComponent } from './trader/trader.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { UnAuthGuard } from './auth/guards/unauth.guard';


const routes: Routes = [
  {
    path: '',
    component: TraderComponent,
    loadChildren: () => import('./trader/trader.module').then(m => m.TraderModule),
    canActivate: [UnAuthGuard]
  },
  {
    path:'login',
    component: LoginComponent,
    //loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component: SignUpComponent,
    //loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[AuthGuard]
  },
  
  {
		path: '',
		redirectTo: '',
		pathMatch: 'full'
	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

