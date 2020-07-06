import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/model/hero';
import { Observable } from 'rxjs';

import { HeroService } from '../heroes/hero.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  hero: Hero = new Hero();
  heroes$: Observable<Hero[]>;
  heroesCount$: Observable<number>;



  constructor(private heroService: HeroService){
    this.heroes$  = heroService.entities$;
    this.heroesCount$ = heroService.count$;

  }

   ngOnInit(){
      this.getHeroes();
   }

   getHeroes() {
    this.heroService.getAll();
  }

  




}
