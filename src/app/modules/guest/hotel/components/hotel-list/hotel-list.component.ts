import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";
import {ReservationDialogComponent} from "../../../../shared/reservation-dialog/reservation-dialog.component";
import {MessageService} from "../../../../../core/services/message.service";
import {tap} from "rxjs";
import {RoomService} from "../../../../../core/services/room.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

  private dialog: Dialog = inject(Dialog);
  private hotelService: HotelService = inject(HotelService);
  private messageService: MessageService = inject(MessageService);
  private roomService: RoomService = inject(RoomService);

  hotels: Hotel[] = [];
  tempHotels: Hotel[] = [];
  searchCriteria: any = {
    checkInDate: '',
    checkOutDate: '',
    capacity: 0,
    city: '',
  };

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.messageService.showLoading('Cargando hoteles...');
    this.hotelService.getHotels().subscribe((hotels: any) => {
      this.hotels = hotels.map((hotel: any) => {
        return {
          id: hotel.payload.doc.id,
          ...hotel.payload.doc.data()
        }
      });
      this.tempHotels = [...this.hotels];
      this.messageService.close();
      this.hotels = this.hotels.filter((hotel: Hotel) => hotel.available);
    });
  }

  openReservationModal(hotel: any | null = null) {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      minWidth: '600px',
      maxWidth: '80%',
      data: {
        hotel,
      },
    });
    dialogRef.closed.subscribe((result: any) => {
      if (result) {
        this.messageService.showSuccess(result);
      }
    });

  }

  searchHotels() {
    console.log('Criterios de búsqueda:', this.searchCriteria);
    this.hotels = [...this.tempHotels];

    if (this.searchCriteria.capacity >= 1) {
      this.hotels.forEach((hotel: Hotel) => {
        this.getRoomsByHotel(hotel);
      });
      console.log('Hoteles:', this.hotels);
      this.hotels = this.hotels.filter((hotel: Hotel) => {
        return hotel.rooms.some((room: any) => {
          return room && room.available;
        });
      });
      console.log('Hoteles:', this.hotels);
    }

    if (this.searchCriteria.city) {
      this.hotels = this.hotels.filter((hotel: Hotel) => {
        return hotel.city.toLowerCase().includes(this.searchCriteria.city.toLowerCase());
      });
    }

  }

  getRoomsByHotel(hotel: Hotel) {
    this.roomService.getRoomsByHotel(hotel.id).pipe(
      tap((rooms: any) => {
        hotel.rooms = rooms.map((room: any) => {
          if (room.payload.doc.data().available && room.payload.doc.data().capacity >= this.searchCriteria.capacity) {
            return {
              id: room.payload.doc.id,
              ...room.payload.doc.data()
            }
          }
        });
      })
    ).subscribe();

  }

}
