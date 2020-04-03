import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Weapon} from './data/weapon';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url = 'weapons';

  constructor(
    private messageService: MessageService,
    private db: AngularFirestore
  ) {
  }

  getWeapons(): Observable<Weapon[]> {
    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          return liste.map(item => {
            const data = item.payload.doc.data();

            const weapon = new Weapon().fromJSON(data);

            weapon.id = item.payload.doc.id;

            return weapon;
          })
        })
      )
  }

  getWeapon(id: string): Observable<Weapon> {
    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          // New Hero
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>(WeaponService.url).add(Object.assign({}, weapon));
  }

  updateWeapon(weapon: Weapon) {
    this.getWeaponDocument(weapon.id).update(Object.assign({}, weapon));
  }

  deleteWeapon(id: string) {
    this.getWeaponDocument(id).delete();
  }

  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {
    return this.db.doc<Weapon>(WeaponService.url + '/' + id);
  }

}
