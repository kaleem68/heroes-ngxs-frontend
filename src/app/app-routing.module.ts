import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged.in.guard';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
    

  {
    path: 'login',

    loadChildren: () =>
    import('./authentication/auth.module').then(m => m.AuthModule),
    canActivate: [LoggedInGuard]
  }
  ,
  {

    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', component:
      LoginComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
