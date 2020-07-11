import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/core/model/hero';
import { NgxsToasterService } from 'src/app/shared/ngxs-store/toaster/ngxs.toaster.service';
import { SubSink } from 'subsink';
import { AddHero, DeleteHero, GetHeroes, UpdateHero } from '../store/hero.actions';
import { HeroState } from '../store/hero.state';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, OnDestroy {

  selected: Hero;
  hero: Hero = new Hero();
  private subs = new SubSink();

  @Select(HeroState.getHeroesList) heroes$: Observable<Hero[]>;
  @Select(HeroState.loading) loading$: Observable<boolean>;

  constructor(private store: Store,
    private ngxsToasterService: NgxsToasterService
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetHeroes())
    this.ngxsToasterService.showToast("HERO");
  }

  getHeroes() {
    this.store.dispatch(new GetHeroes());
    this.close();
  }
  enableAddMode() {
    this.selected = <any>{};
  }


  delete(hero: Hero) {
    this.store.dispatch(new DeleteHero(hero.id));
    this.close();

  }

  select(hero: Hero) { this.selected = hero; }

  add(hero: Hero) {
    this.store.dispatch(new AddHero(hero))
  }

  update(hero: Hero) {
    this.store.dispatch(new UpdateHero(hero, hero.id))
  }

  close() {
    this.selected = null;
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}


