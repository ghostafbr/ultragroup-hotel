import {Component, inject, OnInit} from '@angular/core';
import {Reservation} from 'src/app/core/models/reservation.model';
import {ReservationService} from "../../../../../core/services/reservation.service";
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";
import {Dialog} from "@angular/cdk/dialog";
import {ReservationDetailsComponent} from "../reservation-details/reservation-details.component";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[] = [];
  hotels: Hotel[] = [];
  selectedHotelId: string = '';

  private hotelService: HotelService = inject(HotelService);
  private reservationService: ReservationService = inject(ReservationService);
  private dialog: Dialog = inject(Dialog);


  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    const userId = localStorage.getItem('userId');
    this.hotelService.getHotelsByUser(userId as string).subscribe((hotelsSnapshot: any) => {
      this.hotels = [];
      hotelsSnapshot.forEach((hotelData: any) => {
        this.hotels.push({
          id: hotelData.payload.doc.id,
          ...hotelData.payload.doc.data()
        });
      });
    });

  }

  onHotelChange() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getReservationsByHotel(this.selectedHotelId).subscribe((reservationsSnapshot: any) => {
      this.reservations = [];
      reservationsSnapshot.forEach((reservationData: any) => {
        this.reservations.push({
          id: reservationData.payload.doc.id,
          ...reservationData.payload.doc.data()
        });
      });
      console.log('this.reservations: ', this.reservations);

    });
  }

  openReservationDetailsDialog(reservation: any | null = null) {

    console.log('reservation: ', reservation);

    const dialogRef = this.dialog.open(ReservationDetailsComponent, {
      minWidth: '600px',
      maxWidth: '80%',
      data: {
        reservation,
      },
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result) {
        console.log('The dialog was closed');
        console.log(result);
      }
    });

  }


}
