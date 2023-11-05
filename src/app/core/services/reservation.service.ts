import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {RoomService} from "./room.service";
import {GuestService} from "./guest.service";
import {EmergencyContactService} from "./emergency-contact.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private fireStore: AngularFirestore = inject(AngularFirestore);
  private authService: AuthService = inject(AuthService);
  private roomService: RoomService = inject(RoomService);
  private guestService: GuestService = inject(GuestService);
  private emergencyContactService: EmergencyContactService = inject(EmergencyContactService);

  async saveReservation(reservation: any) {

    const {emergencyContact, guests, hotelId, roomId} = reservation;

    delete reservation.emergencyContact;
    delete reservation.guests;

    const result = await this.fireStore.collection('reservations').add(reservation);

    emergencyContact.reservationId = result.id;
    this.emergencyContactService.saveEmergencyContact(emergencyContact);

    guests.forEach((guest: any) => {
      guest.reservationId = result.id;
      this.guestService.createGuest(guest);
    });

    await this.roomService.updateRoom(hotelId, roomId, {available: false});

    this.sendEmail(result.id);

  }

  getAllReservations() {
    return this.fireStore.collection('reservations').snapshotChanges();
  }

  getReservationById(id: string) {
    return this.fireStore.collection('reservations').doc(id).snapshotChanges();
  }

  getReservationsByUser(id: string) {
    return this.fireStore.collection('reservations', ref => ref.where('userId', '==', id)).snapshotChanges();
  }

  getReservationsByHotel(id: string) {
    return this.fireStore.collection('reservations', ref => ref.where('hotelId', '==', id)).snapshotChanges();
  }

  getReservationsByRoom(id: string) {
    return this.fireStore.collection('reservations', ref => ref.where('roomId', '==', id)).snapshotChanges();
  }

  getReservationsByHotelAndRoom(hotelId: string, roomId: string) {
    return this.fireStore.collection('reservations', ref => ref.where('hotelId', '==', hotelId).where('roomId', '==', roomId)).snapshotChanges();
  }

  sendEmail(reservationId: string) {
    const user = this.authService.user;
    if (!user) {
      return;
    }
    return this.fireStore.collection('emails').add({
      from: 'UltraGroup Hotel App',
      to: user.email,
      subject: 'Reserva generada correctamente',
      text: `Hola ${user.firstName} ${user.lastName}, tu reserva ha sido generada correctamente con el ID: ${reservationId}.`
    });
  }


}
