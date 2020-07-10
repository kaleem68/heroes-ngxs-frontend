import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Actions, ofActionDispatched, Store, ofActionSuccessful } from '@ngxs/store';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Logout, Login } from '../authentication/auth.state';

export class RouteNavigate {
  static readonly type = '[Component] Navigate Action ';
  constructor(public payload: string) {
  }
}

@Injectable({ providedIn: 'root' })
export class RouteHandler implements OnDestroy {

  private subs = new SubSink();

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions) {

      this.subs.sink = this.actions$
      .pipe(ofActionDispatched(RouteNavigate))
      .subscribe(({ payload }) => this.router.navigate([payload]));

      this.subs.sink = this.actions$.pipe
      (ofActionDispatched(Logout),
    ).subscribe(() => {
        this.store.dispatch(new RouteNavigate("/login"))
    });

    this.subs.sink = this.actions$.pipe
      (ofActionSuccessful(Login),
    ).subscribe(() => {
      this.store.dispatch(new RouteNavigate("/heroes"));
    });

  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
