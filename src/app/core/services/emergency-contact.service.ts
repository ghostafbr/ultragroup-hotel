import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {

  private fireStore: AngularFirestore = inject(AngularFirestore);

  getEmergencyContactByReservation(id: string) {
    return this.fireStore.collection('emergencyContacts', ref => ref.where('reservationId', '==', id)).snapshotChanges();
  }

  saveEmergencyContact(emergencyContact: any) {
    return this.fireStore.collection('emergencyContacts').add(emergencyContact);
  }
}
