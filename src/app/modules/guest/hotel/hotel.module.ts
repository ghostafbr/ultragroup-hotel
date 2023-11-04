import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelReservationComponent } from './components/hotel-reservation/hotel-reservation.component';



@NgModule({
  declarations: [
    HotelListComponent,
    HotelReservationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HotelModule { }
