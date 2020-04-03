import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Hero} from './data/hero';
import {MessageService} from './message.service';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import setPrototypeOf = Reflect.setPrototypeOf;

@Injectable({providedIn: 'root'})
export class HeroService {

  private static url = 'heroes';

  constructor(private messageService: MessageService,
              private db: AngularFirestore) {
  }

// Récupération des héros
  getHeroes(): Observable<Hero[]> {

    return this.db.collection<Hero>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

            // Traitement de la liste
            return liste.map(item => {

              // Get document data
              const data = item.payload.doc.data();

              // New Hero
              const hero = new Hero().fromJSON(data);

              // Get document id
              hero.id = item.payload.doc.id;

              // Use spread operator to add the id to the document data
              return hero;

            });
          }
        )
      );
  }

  // Récupération d'un héro en fonction de son id
  getHero(id: string): Observable<Hero> {

    // Return hero observable
    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Hero
          const hero = new Hero().fromJSON(data);
          hero.id = id;

          // log
          console.log('getHero(' + id + ')');

          // Use spread operator to add the id to the document data
          return hero;
        })
      );
  }

  // Ajout d'un héro
  addHero(hero: Hero) {
    this.db.collection<Hero>(HeroService.url).add(Object.assign({}, hero));
  }

  // Modification d'un héro
  updateHero(hero: Hero) {

    // Update document
    this.getHeroDocument(hero.id).update(Object.assign({}, hero));
  }

  // Suppression d'un héro
  deleteHero(id: string) {
    // Delete the document
    this.getHeroDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {
    // return document
    return this.db.doc<Hero>(HeroService.url + '/' + id);
  }

}
