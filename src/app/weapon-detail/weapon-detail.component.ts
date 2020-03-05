import { Component, OnInit } from '@angular/core';
import {Weapon} from '../data/weapon';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {WeaponService} from '../weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {
  weapon: Weapon;
  static readonly maxPoints = 0;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) { }

  ngOnInit() {
    this.initWeapon();
  }

  private initWeapon() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id).subscribe(weapon => this.weapon = weapon);
  }

  goBack(): void {
    this.location.back();
  }

  getPointsRestants(): number{
    return (WeaponDetailComponent.maxPoints-(this.weapon.pv+this.weapon.esquive+this.weapon.degats+this.weapon.attaque));
  }

  getMaxStat(statValue):number{
    return statValue+this.getPointsRestants();
  }

  isWeaponValid():boolean{
    return (this.getPointsRestants()>=0
      && this.weapon.degats > 0
      && this.weapon.esquive > 0
      && this.weapon.attaque > 0
      && this.weapon.pv > 0
      && this.weapon.name.trim() != "");
  }

}
