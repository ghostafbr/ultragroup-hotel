import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReservationRoutingModule} from "./reservation-routing.module";
import { ReservationComponent } from './components/reservation/reservation.component';
import {FormsModule} from "@angular/forms";
import {DialogModule} from "@angular/cdk/dialog";
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';



@NgModule({
  declarations: [
    ReservationComponent,
    ReservationDetailsComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    DialogModule,
  ]
})
export class ReservationModule { }
