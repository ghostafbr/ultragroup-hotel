import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {RoomService} from "./room.service";
import {GuestService} from "./guest.service";

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {

  private fireStore: AngularFirestore = inject(AngularFirestore);
  private authService: AuthService = inject(AuthService);
  private roomService: RoomService = inject(RoomService);
  private guestService: GuestService = inject(GuestService);

  getEmergencyContactByReservation(id: string) {
    return this.fireStore.collection('emergencyContacts', ref => ref.where('reservationId', '==', id)).snapshotChanges();
  }

  saveEmergencyContact(emergencyContact: any) {
    return this.fireStore.collection('emergencyContacts').add(emergencyContact);
  }
}
