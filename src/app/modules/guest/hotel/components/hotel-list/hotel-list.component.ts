import {Component, inject} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent {

  private dialog: Dialog = inject(Dialog);
  private hotelService: HotelService = inject(HotelService);

  hotels: Hotel[] = [];
  searchCriteria: any = {
    checkInDate: '',
    checkOutDate: '',
    capacity: 1,
    city: '',
  };


  openReservationModal(hotel: any | null = null) {

    console.log('hotel: ', hotel);

  }

  searchHotels()  {
    console.log('Criterios de búsqueda:', this.searchCriteria);
  }

}
