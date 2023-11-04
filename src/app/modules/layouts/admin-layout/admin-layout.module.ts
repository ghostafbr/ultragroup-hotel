import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import {AdminLayoutRoutingModule} from "./admin-layout-routing.module";
import {NavbarComponent} from "../components/navbar/navbar.component";



@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    NavbarComponent
  ]
})
export class AdminLayoutModule { }
