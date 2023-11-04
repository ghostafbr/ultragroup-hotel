import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from './auth.service';
import {RoomService} from './room.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private fireStore: AngularFirestore = inject(AngularFirestore);
  private authService: AuthService = inject(AuthService);
  private roomService: RoomService = inject(RoomService);

  constructor() {
  }

  // Obtener todos los hoteles
  getHotels() {
    return this.fireStore.collection('hotels').snapshotChanges();
  }

  // Obtener un hotel por id
  getHotelById(id: string) {
    return this.fireStore.collection('hotels').doc(id).snapshotChanges();
  }

  // Obtener hoteles por usuario
  getHotelsByUser(userId: string) {
    console.log(userId);
    return this.fireStore.collection('hotels', ref => ref.where('userId', '==', userId)).snapshotChanges();
  }

  // Crear un hotel
  async createHotel(hotel: any) {
    const newHotel = {
      ...hotel,
      imageUrl: 'https://via.placeholder.com/300x200',
      userId: this.authService.user?.uid
    }
    const rooms = hotel.rooms;
    delete newHotel.rooms;
    const result = await this.fireStore.collection('hotels').add(newHotel);
    rooms.forEach((room: any) => {
      return this.roomService.createRoom(result.id, room);
    });
  }

  // Actualizar un hotel
  async updateHotel(id: string, hotel: any) {
    await this.fireStore.collection('hotels').doc(id).update(hotel);
    const rooms = hotel.rooms;
    rooms.forEach((room: any) => {
      if (room.id) {
        return this.roomService.updateRoom(id, room.id, room);
      } else {
        return this.roomService.createRoom(id, room);
      }
    });
  }

  // Eliminar un hotel
  deleteHotel(id: string) {
    return this.fireStore.collection('hotels').doc(id).delete();
  }

}
