import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {HotelReservationComponent} from './components/hotel-reservation/hotel-reservation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HotelRoutingModule} from "./hotel-routing.module";
import {DialogModule} from "@angular/cdk/dialog";


@NgModule({
  declarations: [
    HotelListComponent,
    HotelReservationComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class HotelModule {
}
