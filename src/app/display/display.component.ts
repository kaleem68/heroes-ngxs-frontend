import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HeroState } from '../heroes/store/hero.state';
import { Subscription, Observable } from 'rxjs';
import { Hero } from '../core/model/hero';
import { tap } from 'rxjs/operators';
import { GetHeroes } from '../heroes/store/hero.actions';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Select(HeroState.getHeroesList) heroes$: Observable<Hero[]>;
}
