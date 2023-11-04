import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestLayoutComponent } from './guest-layout.component';
import {GuestLayoutRoutingModule} from "./guest-layout-routing.module";
import {NavbarComponent} from "../components/navbar/navbar.component";



@NgModule({
  declarations: [
    GuestLayoutComponent
  ],
  imports: [
    CommonModule,
    GuestLayoutRoutingModule,
    NavbarComponent
  ]
})
export class GuestLayoutModule { }
