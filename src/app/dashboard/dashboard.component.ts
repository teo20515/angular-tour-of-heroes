import { Component, OnInit } from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.sort(
        function (a, b) {
          return ((b.attaque + b.degats) - (a.attaque + a.degats));
        }
      )
        .splice(0, 5));
  }
}
