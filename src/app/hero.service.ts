import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './data/hero';
import { HEROES } from './data/mock-heroes';
import { MessageService } from './message.service';
import setPrototypeOf = Reflect.setPrototypeOf;

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
