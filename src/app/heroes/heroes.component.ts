import { Component, OnInit } from '@angular/core';
import {Hero} from '../data/hero';
import {HEROES} from '../data/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  heroes = HEROES;
  selectedHero: Hero;

  hero: Hero = {
    id: 1,
    name: 'Windstrom'
  };

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit() {
  }
}
