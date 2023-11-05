import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";
import {ReservationDialogComponent} from "../../../../shared/reservation-dialog/reservation-dialog.component";
import {MessageService} from "../../../../../core/services/message.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

  private dialog: Dialog = inject(Dialog);
  private hotelService: HotelService = inject(HotelService);
  private messageService: MessageService = inject(MessageService);

  hotels: Hotel[] = [];
  searchCriteria: any = {
    checkInDate: '',
    checkOutDate: '',
    capacity: 1,
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
  }

}
