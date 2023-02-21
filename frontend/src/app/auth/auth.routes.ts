import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
export const authRoutes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuard]
  },
	{
		path: '**',
		redirectTo: 'login',
		pathMatch: 'full'
	}
  
]
