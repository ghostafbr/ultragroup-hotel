export interface Room {
  id: string; // Identificador único de la habitación
  type: string; // Tipo de habitación
  baseCost: number; // Costo base de la habitación
  taxes: number; // Impuestos aplicados a la habitación
  isDisabled: boolean; // Indica si la habitación está deshabilitada
  location: string; // Ubicación de la habitación en el hotel
  capacity: number; // Capacidad de la habitación
}
