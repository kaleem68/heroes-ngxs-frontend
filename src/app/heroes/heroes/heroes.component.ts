import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { Hero } from 'src/app/core/model/hero';
import { Store, Select, ofActionSuccessful, Actions } from '@ngxs/store'
import {
  AddHero, GetHeroes, DeleteHero, UpdateHero,
} from '../store/hero.actions'
import { HeroState } from '../store/hero.state';
import { ToastService } from '../../shared/ngxs-store/toaster/toast.service';


import { NgxsToasterService } from '../../shared/ngxs-store/toaster/ngxs.toaster.service';


import { SubSink } from 'subsink';

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
    private actions$: Actions,
    private toastService: ToastService,
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

  showToaster() {

    //heroes loading success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(GetHeroes))
        .subscribe(() => {
          this.toastService.openSnackBar("Heroes Loaded..", GetHeroes.type);
        })

    //hero updated success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(UpdateHero))
        .subscribe(() => {
          this.toastService.openSnackBar("Heroes Updated..", UpdateHero.type);
        })

    //hero added success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(AddHero))
        .subscribe(() => {
          this.toastService.openSnackBar("Heroes Added..", AddHero.type);
        })
    //hero deleted success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(DeleteHero))
        .subscribe(() => {
          this.toastService.openSnackBar("Heroes Deleted..", DeleteHero.type);
        })
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}


