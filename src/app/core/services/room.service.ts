import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    private fireStore: AngularFirestore = inject(AngularFirestore);

    // Obtener todas las habitaciones de un hotel
    getRoomsByHotel(hotelId: string) {
        return this.fireStore.collection('hotels').doc(hotelId).collection('rooms').snapshotChanges();
    }

    // Crear una habitación
    createRoom(hotelId: string, room: any) {
        return this.fireStore.collection('hotels').doc(hotelId).collection('rooms').add(room);
    }

    // Actualizar una habitación
    updateRoom(hotelId: string, roomId: string, room: any) {
        return this.fireStore.collection('hotels').doc(hotelId).collection('rooms').doc(roomId).update(room);
    }

}
