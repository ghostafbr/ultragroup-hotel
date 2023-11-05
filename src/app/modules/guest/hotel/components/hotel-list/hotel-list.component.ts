import {Component, inject, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";
import {HotelDetailsComponent} from "../../../../admin/hotel/components/hotel-details/hotel-details.component";
import {ReservationDialogComponent} from "../../../../shared/reservation-dialog/reservation-dialog.component";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit{

  private dialog: Dialog = inject(Dialog);
  private hotelService: HotelService = inject(HotelService);

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
    this.hotelService.getHotels().subscribe((hotels: any) => {
      this.hotels = hotels.map((hotel: any) => {
        return {
          id: hotel.payload.doc.id,
          ...hotel.payload.doc.data()
        }
      });

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
        console.log('The dialog was closed');
        console.log(result);
      }
    });

  }

  searchHotels()  {
    console.log('Criterios de búsqueda:', this.searchCriteria);
  }

}
