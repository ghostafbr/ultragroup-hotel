import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HotelListComponent} from "./components/hotel-list/hotel-list.component";
import {HotelDetailsComponent} from "./components/hotel-details/hotel-details.component";


const routes: Routes = [
  {
    path: '',
    component: HotelListComponent
  },
  {
    path: ':id',
    component: HotelDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoutingModule {}
