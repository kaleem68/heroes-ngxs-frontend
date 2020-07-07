
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../core/model/hero';

export const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(API_URL+'/api/heroes');
  }

  createHero(Hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(API_URL+'/api/hero', Hero);
  }

  deleteHero(HeroId: number): Observable<any> {
    return this.http.delete(API_URL+'/api/hero' + HeroId);
  }

  updateHero(HeroId: string | number, changes: Partial<Hero>): Observable<any> {
    return this.http.put(API_URL+'/api/hero' + HeroId, changes);
  }
}
