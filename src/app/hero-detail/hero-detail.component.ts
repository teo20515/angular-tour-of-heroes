import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero }         from '../data/hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  static readonly maxPoints = 40;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initHero();
  }

  initHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  getPointsRestants(): number{
    return (HeroDetailComponent.maxPoints-(this.hero.pv+this.hero.degats+this.hero.esquive+this.hero.attaque));
  }

  getMaxStat(statValue):number{
    return statValue+this.getPointsRestants();
  }

  isHeroValid():boolean{
    return (this.getPointsRestants()>=0
            && this.hero.degats > 0
            && this.hero.esquive > 0
            && this.hero.attaque > 0
            && this.hero.pv > 0
            && this.hero.name.trim() != "");
  }

}
