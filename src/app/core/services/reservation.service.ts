import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {RoomService} from "./room.service";
import {GuestService} from "./guest.service";
import {EmergencyContactService} from "./emergency-contact.service";
import {Guest} from "../models/guest.model";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    private fireStore: AngularFirestore = inject(AngularFirestore);
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

        this.sendEmail(result.id, guests);

    }

    getReservationsByHotel(id: string) {
        return this.fireStore.collection('reservations', ref => ref.where('hotelId', '==', id)).snapshotChanges();
    }

    sendEmail(reservationId: string, guests: Guest[]) {
        const emails = guests.map((guest: Guest) => guest.email);

        const htmlBody = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7f7f7;
        }
        .header {
          background-color: #3498db;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        .message {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>UltraGroup Hotel App</h1>
        </div>
        <div class="message">
          <h2>Reserva generada correctamente</h2>
          <p>Hola,</p>
          <p>Muchas gracias por confiar en nosotros. Tu reserva ha sido generada correctamente con el ID: <strong>${reservationId}</strong>.</p>
          <p>¡Esperamos que tengas una estancia maravillosa en nuestros hoteles!</p>
        </div>
      </div>
    </body>
    </html>
  `;

        return this.fireStore.collection('emails').add({
            from: 'UltraGroup Hotel App',
            to: emails,
            message: {
                subject: 'Reserva generada correctamente',
                html: htmlBody
            }
        });
    }


}
