import {Room} from "./room.model";

export interface Hotel {
  id: string; // Identificador único del hotel
  name: string; // Nombre del hotel
  city: string; // Ubicación del hotel
  description: string; // Descripción del hotel
  available: boolean; // Indica si el hotel está deshabilitado
  rooms: Room[]; // Lista de habitaciones disponibles en el hotel
  imageUrl: string; // URL de la imagen del hotel
}
