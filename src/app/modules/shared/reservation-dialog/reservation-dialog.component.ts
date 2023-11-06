import {Component, Inject, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DIALOG_DATA, DialogModule, DialogRef} from "@angular/cdk/dialog";
import {RoomService} from "../../../core/services/room.service";
import {InputData} from "../../../core/models/input-data.model";
import {Hotel} from "../../../core/models/hotel.model";
import {Room} from "../../../core/models/room.model";
import {ReservationService} from "../../../core/services/reservation.service";
import {MessageService} from "../../../core/services/message.service";

@Component({
    selector: 'app-reservation-dialog',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DialogModule],
    templateUrl: './reservation-dialog.component.html'
})
export class ReservationDialogComponent implements OnInit {

    private fb: FormBuilder = inject(FormBuilder);
    public dialogRef: DialogRef<string> = inject(DialogRef);
    private roomService: RoomService = inject(RoomService);
    private messageService: MessageService = inject(MessageService);
    private reservationService: ReservationService = inject(ReservationService);

    reservationForm!: FormGroup;
    hotel: Hotel;
    availableRooms: Room[] = [];

    constructor(
        @Inject(DIALOG_DATA) data: InputData,
    ) {
        this.hotel = data.hotel;
    }

    ngOnInit() {
        this.initReservationForm();
        this.getRooms();
        this.loadGuests();
    }

    initReservationForm() {
        this.reservationForm = this.fb.group({
            checkInDate: ['', Validators.required],
            checkOutDate: ['', Validators.required],
            guests: this.fb.array([]),
            emergencyContact: this.fb.group({
                name: ['', Validators.required],
                contactPhone: ['', Validators.required],
            }),
            roomId: ['', Validators.required],
            hotelId: [this.hotel ? this.hotel.id : null, Validators.required],
            userId: [localStorage.getItem('userId'), Validators.required],
        });
    }

    get guestArray() {
        return this.reservationForm.get('guests') as FormArray;
    }

    getRooms() {
        this.messageService.showLoading('Consultando habitaciones disponibles...');
        this.roomService.getRoomsByHotel(this.hotel.id).subscribe((result) => {
            const rooms = result.map((room: any) => {
                return {
                    id: room.payload.doc.id,
                    ...room.payload.doc.data()
                }
            });
            this.messageService.close();
            this.availableRooms = rooms.filter((room: Room) => room.available);
        });
    }

    loadGuests() {
        this.addGuest();
    }

    addGuest() {
        this.guestArray.push(
            this.fb.group({
                name: ['', Validators.required],
                birthdate: ['', Validators.required],
                gender: ['', Validators.required],
                documentType: ['', Validators.required],
                documentNumber: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                contactPhone: ['', Validators.required],
            })
        );
    }

    removeGuest(index: number) {
        this.guestArray.removeAt(index);
    }

    submitReservation() {
        if (this.reservationForm.invalid) {
            return;
        }
        this.messageService.showLoading('Realizando reserva...');
        this.reservationService.saveReservation(this.reservationForm.value).then(() => {
            this.closeDialog('Reserva realizada con éxito');
        });
    }

    closeDialog(message?: string): void {
        this.dialogRef.close(message);
    }


}
