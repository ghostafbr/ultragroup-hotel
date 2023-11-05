import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {RoomService} from "./room.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private fireStore: AngularFirestore = inject(AngularFirestore);
  private authService: AuthService = inject(AuthService);
  private roomService: RoomService = inject(RoomService);

  async saveReservation(reservation: any) {

    const {emergencyContact, guests, hotelId, roomId} = reservation;

    delete reservation.emergencyContact;
    delete reservation.guests;
    const result = await this.fireStore.collection('reservations').add(reservation);
    console.log('result: ', result);
    emergencyContact.reservationId = result.id;
    await this.fireStore.collection('emergencyContacts').add(emergencyContact);
    guests.forEach((guest: any) => {
      guest.reservationId = result.id;
      return this.fireStore.collection('guests').add(guest);
    });

    await this.roomService.updateRoom(hotelId, roomId, {available: false});

    this.sendEmail(result.id);

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
