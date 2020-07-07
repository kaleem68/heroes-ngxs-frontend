import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hero } from 'src/app/core/model/hero';
import { Store, Select } from '@ngxs/store'
import {
  AddHero, GetHeroes,
} from '../store/hero.actions'
import { HeroState } from '../store/hero.state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit,OnDestroy {


   selected: Hero;
   hero: Hero = new Hero();

   areHeroesLoadedSub: Subscription;

   @Select (HeroState.getHeroesList) heroes$: Observable<Hero[]>;
   @Select(HeroState.areHeroesLoaded) areHeroesLoaded$;

  constructor(private store: Store){}

  ngOnInit() {

    this.areHeroesLoadedSub = this.areHeroesLoaded$.pipe(
      tap((areHerosLoaded) => {
        if (!areHerosLoaded) {
          this.store.dispatch(new GetHeroes());
        }
      })
    ).subscribe(value => {
      console.log(value);
    });
  }

  getHeroes(){}
  enableAddMode(){}

   saveHero(){
      this.store.dispatch(new AddHero(this.hero));
    }

    ngOnDestroy() {
    this.areHeroesLoadedSub.unsubscribe();
  }



}
