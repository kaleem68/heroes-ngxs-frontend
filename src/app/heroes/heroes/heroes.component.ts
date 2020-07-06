import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/model/hero';
import { Store } from '@ngrx/store';

import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {


  hero: Hero = new Hero();

  heroes$: Observable<Hero[]>;

  constructor(
    private heroService: HeroService){
      this.heroes$  = heroService.entities$;
  }

   ngOnInit(){
       this.getHeroes();
   }
   saveHero(){

      this.heroService.add(this.hero)

    }
   getHeroes() {
     this.heroService.getAll();
  }



}
