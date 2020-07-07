import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/core/model/hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;

  constructor() { }

  byId(hero: Hero) {
    return hero.id;
  }

  ngOnInit(): void {
  }

  select(hero: Hero) {
  }
  deleteHero(hero: Hero){
    
  }

}
