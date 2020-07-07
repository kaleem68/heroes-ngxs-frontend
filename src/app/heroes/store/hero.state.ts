import { State, Action, StateContext, Selector } from '@ngxs/store';

import {
  AddHero,
  UpdateHero,
  GetHeroes,
  DeleteHero
} from '../store/hero.actions'
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../hero.service';
import { Injectable } from '@angular/core';

///avoid using classes for StateModel.
export class HeroeStateModel {
  Heroes: Hero[];
  areHeroesLoaded: boolean;
}

@State<HeroeStateModel>({
  name: 'Heroes',
  defaults: {
    Heroes: [],
    areHeroesLoaded: false
  }
})


@Injectable({
  providedIn: 'root'
})

export class HeroState {

  // constructor(private heroService: HeroService, private router: Router) {}

  constructor(private heroService: HeroService) {}

  @Selector()
  static getHeroesList(state: HeroeStateModel) {
    return state.Heroes;
  }

  @Selector()
  static areHeroesLoaded(state: HeroeStateModel) {
    return state.areHeroesLoaded;
  }


  @Action(GetHeroes)
   getHeroes({ getState, setState }: StateContext<HeroeStateModel>) {
    return this.heroService.getAllHeroes().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          Heroes: result,
          areHeroesLoaded: true
        });
      })
    );
  }

  @Action(DeleteHero)
  deleteHero({ getState, setState }: StateContext<HeroeStateModel>,
    { id }: DeleteHero) {
    return this.heroService.deleteHero(id).pipe(
      tap(result => {
        const state = getState();
        const filteredArray = state.Heroes.filter(item => item.id !== id);
        setState({
          ...state,
          Heroes: filteredArray,
        });
      })
    );
  }


  @Action(UpdateHero)
  updateHero({ getState, setState }: StateContext<HeroeStateModel>,
    { payload, id }: UpdateHero){
    return this.heroService.updateHero(id, payload).pipe(
      tap(result => {
        const state = getState();
        const heroesList = [...state.Heroes]; //returns new object which returns Hero [] from state

        const heroIndex = heroesList.findIndex(item => item.id === id);
        heroesList[heroIndex] = result;

        setState({
          ...state,
          Heroes: heroesList,
        });
      })
    );
  }

  @Action(AddHero)
  addTodo({ getState, patchState }: StateContext<HeroeStateModel>, { payload }: AddHero) {
    return this.heroService.createHero(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        Heroes: [...state.Heroes, result]
      });
      // this.router.navigateByUrl('/heroes');
    }));
  }
}