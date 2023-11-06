import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {RoomService} from './room.service';
import {combineLatest, filter, map, mergeMap, switchMap} from "rxjs";
import {Hotel} from "../models/hotel.model";

@Injectable({
    providedIn: 'root'
})
export class HotelService {

    private fireStore: AngularFirestore = inject(AngularFirestore);
    private roomService: RoomService = inject(RoomService);

    // Obtener todos los hoteles
    getHotels() {
        return this.fireStore.collection('hotels').snapshotChanges();
    }

    // Obtener hoteles por usuario
    getHotelsByUser(userId: string) {
        return this.fireStore.collection('hotels', ref => ref.where('userId', '==', userId)).snapshotChanges();
        /*if (!name) {
            return this.fireStore.collection('hotels', ref => ref.where('userId', '==', userId)).snapshotChanges();
        } else {
            return this.fireStore.collection('hotels', ref => ref.where('userId', 'array-contains', userId).where('name', '==', name)).snapshotChanges();
        }*/
    }

    // Crear un hotel
    async createHotel(hotel: any) {
        const newHotel = {
            ...hotel,
            imageUrl: 'https://via.placeholder.com/300x200',
            userId: localStorage.getItem('userId')
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
        const rooms = hotel.rooms;
        delete hotel.rooms;
        await this.fireStore.collection('hotels').doc(id).update(hotel);
        rooms.forEach((room: any) => {
            if (room.id) {
                return this.roomService.updateRoom(id, room.id, room);
            } else {
                return this.roomService.createRoom(id, room);
            }
        });
    }

    searchHotelsByCityAndRoomCapacity(city: string, capacity: number) {

        const hotelsSnapshot = city === '' || city === null ? this.getHotels() : this.fireStore.collection('hotels', (ref) =>
            ref.where('city', '==', city)
        ).snapshotChanges();

        return hotelsSnapshot.pipe(
            switchMap((hotels) => {
                return hotels.map((hotel) => {
                    const hotelData = hotel.payload.doc.data() as Hotel;
                    const hotelId = hotel.payload.doc.id;

                    if (capacity === 0 || capacity === null) {
                        // Si la capacidad es 0 o nula, no aplicar ningún filtro de capacidad
                        return this.fireStore.collection('hotels').doc(hotelId).collection('rooms')
                            .valueChanges()
                            .pipe(
                                map((rooms) => {
                                    // return {...hotelData, id: hotelId, rooms};
                                    // Filtra las habitaciones con 'available' igual a true
                                    const availableRooms = rooms.filter((room: any) => room.available === true);
                                    return availableRooms.length > 0 ? {...hotelData, id: hotelId, rooms: availableRooms} : null;
                                })
                            );
                    } else {
                        // Aplicar el filtro de capacidad
                        return this.fireStore.collection('hotels').doc(hotelId).collection('rooms', (roomRef) =>
                            roomRef.where('capacity', '>=', capacity)
                        )
                            .valueChanges()
                            .pipe(
                                map((rooms) => {
                                    if (rooms.length > 0) {
                                        return {...hotelData, id: hotelId, rooms};
                                    } else {
                                        return null;
                                    }
                                })
                            );
                    }
                });
            }),
            mergeMap((queries) => combineLatest(queries)),
            filter((hotel) => hotel !== null),
        );
    }
}
