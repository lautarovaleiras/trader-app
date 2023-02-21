import { HomeComponent } from './pages/home/home.component';
export const traderRoutes = [

    {
      path: 'home',
      component: HomeComponent,
      pathMatch: 'full',
      //canActivate: [AuthGuard,AdminGuard]
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },

]
