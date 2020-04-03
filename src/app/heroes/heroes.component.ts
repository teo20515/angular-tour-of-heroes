import { Component, OnInit } from '@angular/core';

import {Hero} from '../data/hero';
import {HeroService} from '../services/hero.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.initHeroes();
  }

  initHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
