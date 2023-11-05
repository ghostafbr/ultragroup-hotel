import {ChangeDetectorRef, Component, inject, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Room} from "../../../../../core/models/room.model";
import {HotelService} from "../../../../../core/services/hotel.service";
import {RoomService} from "../../../../../core/services/room.service";
import {Guest} from "../../../../../core/models/guest.model";
import {GuestService} from "../../../../../core/services/guest.service";
import {EmergencyContactService} from "../../../../../core/services/emergency-contact.service";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html'
})
export class ReservationDetailsComponent implements OnInit {

  public dialogRef: DialogRef<ReservationDetailsComponent> = inject(DialogRef);
  private guestService: GuestService = inject(GuestService);
  private hotelService: HotelService = inject(HotelService);
  private roomService: RoomService = inject(RoomService);
  private emergencyContactService: EmergencyContactService = inject(EmergencyContactService);

  reservation: any;
  rooms: Room[] = [];
  guests: Guest[] = [];
  emergencyContact: any;

  constructor(
    @Inject(DIALOG_DATA) data: any,
  ) {
    this.reservation = data.reservation;
    this.getGuests();
    this.getEmergencyContact();
  }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getGuests() {
    this.guestService.getGuestsByReservationId(this.reservation.id).subscribe((guestsSnapshot: any) => {
      this.guests = [];
      guestsSnapshot.forEach((guestData: any) => {
        this.guests.push({
          id: guestData.payload.doc.id,
          ...guestData.payload.doc.data()
        });
      });
    });
  }

  getEmergencyContact() {
    this.emergencyContactService.getEmergencyContactByReservation(this.reservation.id).subscribe((emergencyContactSnapshot: any) => {

      emergencyContactSnapshot.forEach((emergencyContactData: any) => {
        this.emergencyContact = {
          id: emergencyContactData.payload.doc.id,
          ...emergencyContactData.payload.doc.data()
        };
      });
      console.log('this.emergencyContact: ', this.emergencyContact);
    });
  }



}
