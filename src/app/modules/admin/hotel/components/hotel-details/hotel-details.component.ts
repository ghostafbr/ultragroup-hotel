import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {HotelService} from "../../../../../core/services/hotel.service";
import {RoomService} from "../../../../../core/services/room.service";
import {Hotel} from "../../../../../core/models/hotel.model";
import {Room} from "../../../../../core/models/room.model";
import {InputData} from "../../../../../core/models/input-data.model";

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html'
})
export class HotelDetailsComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  public dialogRef: DialogRef<HotelDetailsComponent> = inject(DialogRef);
  private hotelService: HotelService = inject(HotelService);
  private roomService: RoomService = inject(RoomService);

  hotel: Hotel;
  rooms: Room[] = [];
  hotelForm!: FormGroup;

  constructor(
    @Inject(DIALOG_DATA) data: InputData,
  ) {
    this.hotel = data.hotel;
  }

  ngOnInit(): void {
    this.initHotelForm();
    this.loadRooms();
  }

  initHotelForm() {
    this.hotelForm = this.fb.group({
      name: [this.hotel ? this.hotel.name : '', Validators.required],
      city: [this.hotel ? this.hotel.city : '', Validators.required],
      description: [this.hotel ? this.hotel.description : '', Validators.required],
      /*price: [this.hotel ? this.hotel.price : 0, Validators.required],*/
      available: this.hotel ? this.hotel.available : true,
      rooms: this.fb.array([]),
    });
  }

  loadRooms() {
    if (this.hotel) {
      this.roomService.getRoomsByHotel(this.hotel.id).subscribe((result) => {
        this.rooms = result.map((room: any) => {
          return {
            id: room.payload.doc.id,
            ...room.payload.doc.data()
          }
        });
        this.rooms.forEach((room: Room) => {
          this.addRoomToForm(room);
        });
      });
    } else {
      this.addRoom();
    }
  }

  addRoomToForm(room: Room) {
    this.roomsArray.push(
      this.fb.group({
        type: [room.type, Validators.required],
        baseCost: [room.baseCost, Validators.required],
        taxes: [room.taxes, Validators.required],
        available: room.available,
        capacity: [room.capacity, [Validators.required, Validators.min(1)]],
        location: [room.location, Validators.required],
        id: [room.id]
      })
    );
  }

  // Getter para acceder a los controles de las habitaciones
  get roomsArray() {
    return this.hotelForm.get('rooms') as FormArray;
  }

  // Agregar una habitación al formulario
  addRoom() {
    this.roomsArray.push(
      this.fb.group({
        type: ['', Validators.required],
        baseCost: [0, Validators.required],
        taxes: [0, Validators.required],
        available: false,
        capacity: [2, [Validators.required, Validators.min(1)]],
        location: ['', Validators.required],
      })
    );
  }

  // Eliminar una habitación del formulario
  removeRoom(index: number) {
    this.roomsArray.removeAt(index);
  }

  // Guardar el hotel
  saveHotel() {
    if (this.hotelForm.invalid) {
      return;
    }

    if (this.hotel?.id) {
      this.hotelService.updateHotel(this.hotel.id, this.hotelForm.value).then((result) => {
        this.dialogRef.close();
      });
    } else {
      this.hotelService.createHotel(this.hotelForm.value).then((result) => {
        this.dialogRef.close();
      });
    }

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
