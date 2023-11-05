import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout.component";


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
        loadChildren: () =>
          import('../../admin/hotel/hotel.module').then((m) => m.HotelModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
