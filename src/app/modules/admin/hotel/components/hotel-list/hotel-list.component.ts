import {Component, inject, OnInit} from '@angular/core';
import {HotelDetailsComponent} from "../hotel-details/hotel-details.component";
import { Dialog } from '@angular/cdk/dialog';
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";
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
  originalHotels: Hotel[] = [];
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
    const userId = localStorage.getItem('userId');
    this.messageService.showLoading('Cargando hoteles...');
    this.hotelService.getHotelsByUser(userId as string).subscribe((hotelsSnapshot: any) => {
      this.hotels = [];
      hotelsSnapshot.forEach((hotelData: any) => {
        this.hotels.push({
          id: hotelData.payload.doc.id,
          ...hotelData.payload.doc.data()
        });
      });
      this.messageService.close();
    });
    this.originalHotels = this.hotels;
  }

  openCreateHotelModal( hotel: any | null = null ) {
    const dialogRef = this.dialog.open(HotelDetailsComponent, {
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
    // Restaura la lista original de hoteles si los criterios de búsqueda están vacíos
    if (!this.searchCriteria.checkInDate && !this.searchCriteria.checkOutDate &&
      !this.searchCriteria.numPeople && !this.searchCriteria.city) {
      this.hotels = this.originalHotels;
      return;
    }

    // Realiza la búsqueda en la lista original de hoteles
    const filteredHotels = this.originalHotels.filter(hotel => {
      return (
        (!this.searchCriteria.city || hotel.city.toLowerCase() === this.searchCriteria.city.toLowerCase())
      );
    });

    console.log('Resultados de búsqueda:', filteredHotels);

    // Actualiza la lista de hoteles con los resultados filtrados
    this.hotels = filteredHotels;

  }

  // Función para verificar si las fechas están en el rango
  isDateInRange(checkInDate: Date, checkOutDate: Date): boolean {
    const startDate = new Date(this.searchCriteria.checkInDate);
    const endDate = new Date(this.searchCriteria.checkOutDate);
    const hotelCheckInDate = new Date(checkInDate);
    const hotelCheckOutDate = new Date(checkOutDate);

    return hotelCheckInDate >= startDate && hotelCheckOutDate <= endDate;
  }

}
