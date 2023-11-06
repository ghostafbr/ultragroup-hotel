import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private fireStore: AngularFirestore = inject(AngularFirestore);

  constructor() { }

  // Obtener todos los guests by reservationId
  getGuestsByReservationId(reservationId: string) {
    return this.fireStore.collection('guests', ref => ref.where('reservationId', '==', reservationId)).snapshotChanges();
  }

  // Crear un guest
  createGuest(guest: any) {
    return this.fireStore.collection('guests').add(guest);
  }

}
