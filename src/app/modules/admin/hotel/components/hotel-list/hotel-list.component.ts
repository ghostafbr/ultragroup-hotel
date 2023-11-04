import {Component, inject, OnInit} from '@angular/core';
import {HotelDetailsComponent} from "../hotel-details/hotel-details.component";
import { Dialog } from '@angular/cdk/dialog';
import {HotelService} from "../../../../../core/services/hotel.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {Hotel} from "../../../../../core/models/hotel.model";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

  private dialog: Dialog = inject(Dialog);
  private hotelService: HotelService = inject(HotelService);
  private authService: AuthService = inject(AuthService);
  // userId: string | undefined = this.authService.user?.uid;  // mirar como hacer que funcione rápido

  hotels: Hotel[] = [];

  ngOnInit() {
    // Obtener todos los hoteles
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
        console.log('The dialog was closed');
        console.log(result);
      }
    });

  }

}
