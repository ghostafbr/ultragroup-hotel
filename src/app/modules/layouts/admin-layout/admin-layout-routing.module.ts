import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout.component";
import {adminGuard} from "../../../core/guards/admin.guard";
import {authGuard} from "../../../core/guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'hotels',
        pathMatch: 'full'
      },
      {
        path: 'hotels',
        loadChildren: () => import('../../admin/hotel/hotel.module').then((m) => m.HotelModule),
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'reservations',
        loadChildren: () => import('../../admin/reservation/reservation.module').then((m) => m.ReservationModule),
        canActivate: [authGuard, adminGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
