import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HotelRoutingModule} from "./hotel-routing.module";
import {DialogModule} from "@angular/cdk/dialog";


@NgModule({
  declarations: [
    HotelListComponent,
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
