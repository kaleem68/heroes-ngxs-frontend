import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { AuthGuard } from './shared/guards/auth.guard'
import { LoginComponent } from './shared/ngxs-store/authentication/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
