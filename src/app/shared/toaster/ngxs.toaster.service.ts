import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SubSink } from 'subsink';

import {
  AddHero,
  DeleteHero,
  GetHeroes,
  UpdateHero
} from '../../heroes/store/hero.actions'

import { ToastService } from '../toaster/toast.service'

export const ENTITY_TYPE = {
  "HERO": {
    get: GetHeroes,
    add: AddHero,
    update: UpdateHero,
    delete: DeleteHero
  }
}
@Injectable({ providedIn: 'root' })

export class NgxsToasterService {

  private subs = new SubSink();

  constructor(private actions$: Actions, private toastService: ToastService) { }

  showToast(entityKey: string) {

    // loading success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(ENTITY_TYPE[entityKey].get))
        .subscribe(() => {
          this.toastService.openSnackBar(entityKey + " Loaded..", ENTITY_TYPE[entityKey].get.type);
        })

    // updated success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(ENTITY_TYPE[entityKey].update))
        .subscribe(() => {
          this.toastService.openSnackBar(entityKey + " Updated..", ENTITY_TYPE[entityKey].update.type);
        })

    // added success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(ENTITY_TYPE[entityKey].add))
        .subscribe(() => {
          this.toastService.openSnackBar(entityKey + " Added..", ENTITY_TYPE[entityKey].add.type);
        })

    // deleted success
    this.subs.sink =
      this.actions$
        .pipe(ofActionSuccessful(ENTITY_TYPE[entityKey].delete))
        .subscribe(() => {
          this.toastService.openSnackBar(entityKey + " Deleted..", ENTITY_TYPE[entityKey].delete.type);
        })
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
