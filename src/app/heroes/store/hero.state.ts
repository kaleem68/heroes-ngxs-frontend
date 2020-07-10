import { State, Action, StateContext, Selector } from '@ngxs/store';
import { delay, catchError } from 'rxjs/operators';

import {
  AddHero,
  UpdateHero,
  GetHeroes,
  DeleteHero
} from '../store/hero.actions'
import { tap } from 'rxjs/operators';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../hero.service';
import { Injectable } from '@angular/core';

///avoid using classes for StateModel.
export class HeroeStateModel {
  Heroes: Hero[];
  loading: boolean;
  error:boolean;
}

@State<HeroeStateModel>({
  name: 'Heroes',
  defaults: {
    Heroes: [],
    loading: false,
    error: false,
  }
})


@Injectable({
  providedIn: 'root'
})

export class HeroState {


  constructor(private heroService: HeroService) { }

  @Selector()
  static getHeroesList(state: HeroeStateModel) {
    return state.Heroes;
  }

  @Selector()
  static loading(state: HeroeStateModel) {
    return state.loading;
  }

  @Selector()
  static error(state: HeroeStateModel) {
    return state.error
  }


  @Action(GetHeroes)
  getHeroes({ getState, setState, patchState }: StateContext<HeroeStateModel>) {

    patchState({
      loading: true
    });


    return this.heroService.getAllHeroes()
      .pipe(delay(1000))
      .pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            Heroes: result,
            loading: false,
            error: false
          });
        }),
        catchError(err => {
          console.log('error')
          return err;
        }),

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
    { payload, id }: UpdateHero) {
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
