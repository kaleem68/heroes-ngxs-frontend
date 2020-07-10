import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { AuthGuard} from './shared/guards/auth.guard'
import { LoggedInGuard} from './shared/guards/logged.in.guard'
import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';

const routes: Routes = [

  {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoggedInGuard]
},

  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
