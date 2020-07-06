import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'heroes' },

  { path: 'heroes', component: HeroesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
