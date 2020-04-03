import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Hero} from '../data/hero';
import {HeroService} from '../services/hero.service';
import {Weapon} from "../data/weapon";
import {WeaponService} from "../services/weapon.service";
import apply = Reflect.apply;
import {getExpressionScope} from "@angular/compiler-cli";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  static readonly maxPoints = 40;

  hero: Hero;
  weapons: Weapon[];
  oldWeapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.initHero();
    } else {
      this.hero = new Hero();
      this.hero.attaque = 0;
      this.hero.degats = 0;
      this.hero.esquive = 0;
      this.hero.pv = 0;
      this.hero.name = "Nouveau Héro";
    }

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

  heroExists() {
    return this.hero.id !== "" && this.hero.id !== undefined && this.hero.id !== null;
  }

  updateHero() {
    this.heroService.updateHero(this.hero);
    this.redirectToList();
  }

  createHero() {
    this.heroService.addHero(this.hero);
    this.redirectToList();
  }

  hasWeapon() {
    return this.hero.weaponId !== null && this.hero.weaponId !== undefined;
  }

  clearWeapon() {
    this.hero.weaponId = null;
    this.resetWeaponStats();
    this.oldWeapon = null;
    // @ts-ignore
    document.getElementById("weapon").selectedIndex = -1;
  }

  redirectToList() {
    this.router.navigate(['/heroes']);
  }

  updateStats() {
    this.resetWeaponStats();
    if (this.hasWeapon()) {
      let weapon = this.weapons.find(weapon => this.hero.weaponId.localeCompare(weapon.id) == 0);

      this.hero.pv += weapon.pv;
      this.hero.esquive += weapon.esquive;
      this.hero.degats += weapon.degats;
      this.hero.attaque += weapon.attaque;

      this.oldWeapon = weapon;
    }
  }

  resetWeaponStats() {
    if (this.oldWeapon !== null && this.oldWeapon !== undefined) {
      this.hero.pv -= this.oldWeapon.pv;
      this.hero.esquive -= this.oldWeapon.esquive;
      this.hero.degats -= this.oldWeapon.degats;
      this.hero.attaque -= this.oldWeapon.attaque;
    }
  }

}
