import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import {HotelRoutingModule} from "./hotel-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "@angular/cdk/dialog";



@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailsComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    DialogModule,
    ReactiveFormsModule
  ]
})
export class HotelModule { }
