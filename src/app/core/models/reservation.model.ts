import {Guest} from "./guest.model";
import {EmergencyContact} from "./emergency-contact.model";

export interface Reservation {
  id: string;
  hotelId: string; // Identificador único del hotel reservado
  roomId: string; // Identificador único de la habitación reservada
  checkInDate: string;
  checkOutDate: string;
  guests: Guest[];
  emergencyContact: EmergencyContact;
  userId: string; // Identificador único del usuario que realizó la reserva
  // totalCost: number; // Costo total de la reserva
}

/*const exampleReservation: Reservation = {
  checkInDate: "2023-11-04",
  checkOutDate: "2023-11-11",
  guests: [
    {
      name: "Andrés Felipe Bolaños Ramírez",
      birthdate: "1996-06-12",
      gender: "masculino",
      documentType: "Cédula",
      documentNumber: "1143866895",
      email: "andres.fbramirez@gmail.com",
      contactPhone: "3182609266",
      reservationId: 'Ab132'
    },
    {
      name: "test",
      birthdate: "2023-10-31",
      gender: "masculino",
      documentType: "cédula",
      documentNumber: "1313",
      email: "test@test.com",
      contactPhone: "3182609266",
      reservationId: 'Ab132'
    },
  ],
  emergencyContact: {
    id: "test",
    name: "test",
    contactPhone: "test@test.com",
    reservationId: 'Ab132'
  },
  roomId: "horX89pT1SRZMoHfbCtL",
};*/
