export interface HotelReservation {
  id: string; // Identificador único de la reserva
  hotelId: string; // Identificador único del hotel reservado
  roomId: string; // Identificador único de la habitación reservada
  checkInDate: Date; // Fecha de entrada
  checkOutDate: Date; // Fecha de salida
  guestName: string; // Nombre del huésped
  totalCost: number; // Costo total de la reserva
}
