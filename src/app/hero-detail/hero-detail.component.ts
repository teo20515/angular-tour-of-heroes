import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Hero} from '../data/hero';
import {HeroService} from '../hero.service';
import {Weapon} from "../data/weapon";
import {WeaponService} from "../weapon.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  static readonly maxPoints = 40;

  hero: Hero;
  weapons: Weapon[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.initHero();
    this.initWeapons();
  }

  initHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  initWeapons(): void {
    this.weaponService.getWeapons().subscribe(weapon => this.weapons = weapon);
  }

  goBack(): void {
    this.location.back();
  }

  getPointsRestants(): number {
    return (HeroDetailComponent.maxPoints - (this.hero.pv + this.hero.degats + this.hero.esquive + this.hero.attaque));
  }

  getMaxStat(statValue): number {
    return statValue+this.getPointsRestants();
  }

  isHeroValid(): boolean {
    return (this.getPointsRestants() >= 0
      && this.hero.degats > 0
      && this.hero.esquive > 0
      && this.hero.attaque > 0
      && this.hero.pv > 0
      && this.hero.name.trim() != "");
  }

  updateHero(hero: Hero) {
    this.heroService.updateHero(hero);
  }

}
