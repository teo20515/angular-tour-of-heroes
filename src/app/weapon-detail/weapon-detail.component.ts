import {Component, OnInit} from '@angular/core';
import {Weapon} from '../data/weapon';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {WeaponService} from '../services/weapon.service';


@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {
  weapon: Weapon;

  static readonly MAX_POINTS = 0;
  static readonly MAX_POINTS_STAT = 5;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location,
    private router: Router
  ) {
  }

  private static verifyStats(weapon: Weapon) {
    let MAX = this.MAX_POINTS_STAT;

    return (weapon.attaque <= MAX && weapon.attaque >= -MAX)
      && (weapon.pv <= MAX && weapon.pv >= -MAX)
      && (weapon.esquive <= MAX && weapon.esquive >= -MAX)
      && (weapon.degats <= MAX && weapon.degats >= -MAX);
  }

  private initWeapon() {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id).subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.initWeapon();
    } else {
      this.weapon = new Weapon();
      this.weapon.attaque = 0;
      this.weapon.degats = 0;
      this.weapon.esquive = 0;
      this.weapon.pv = 0;
      this.weapon.name = "Nouvelle Arme";
    }
  }

  getPointsRestants(): number {
    return (WeaponDetailComponent.MAX_POINTS - (this.weapon.pv + this.weapon.esquive + this.weapon.degats + this.weapon.attaque));
  }

  weaponExists() {
    return this.weapon.id !== "" && this.weapon.id !== undefined && this.weapon.id !== null;
  }

  updateWeapon() {
    this.weaponService.updateWeapon(this.weapon);
    this.redirectToList();
  }

  createWeapon() {
    this.weaponService.addWeapon(this.weapon);
    this.redirectToList();
  }

  isWeaponValid(): boolean {
    return (this.getPointsRestants() == 0
      && WeaponDetailComponent.verifyStats(this.weapon)
      && this.weapon.name.trim() != '');
  }

  redirectToList() {
    this.router.navigate(['/weapons']);
  }


}
