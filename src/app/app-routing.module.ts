import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { AuthGuard } from './shared/guards/auth.guard'
import { LoggedInGuard } from './shared/guards/logged.in.guard'
import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';



const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },

  {

    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then(m => m.HeroesModule),
    component: HeroesComponent,

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
