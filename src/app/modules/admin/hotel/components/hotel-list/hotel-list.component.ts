import {Component, inject, OnInit} from '@angular/core';
import {HotelDetailsComponent} from "../hotel-details/hotel-details.component";
import {Dialog} from '@angular/cdk/dialog';
import {HotelService} from "../../../../../core/services/hotel.service";
import {Hotel} from "../../../../../core/models/hotel.model";
import {MessageService} from "../../../../../core/services/message.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-hotel-list',
    templateUrl: './hotel-list.component.html'
})
export class HotelListComponent implements OnInit {

    private dialog: Dialog = inject(Dialog);
    private hotelService: HotelService = inject(HotelService);
    private messageService: MessageService = inject(MessageService);

    private hotelSubscription!: Subscription;

    hotels: Hotel[] = [];
    searchCriteria: any = {
        checkInDate: '',
        checkOutDate: '',
        capacity: 1,
        city: '',
    };
    userId = localStorage.getItem('userId');

    ngOnInit() {
        // this.getHotels();
        this.searchHotels();
    }

    getHotels() {
        this.messageService.showLoading('Cargando hoteles...');
        this.hotelService.getHotelsByUser(this.userId as string).subscribe((hotelsSnapshot: any) => {
            this.hotels = [];
            hotelsSnapshot.forEach((hotelData: any) => {
                this.hotels.push({
                    id: hotelData.payload.doc.id,
                    ...hotelData.payload.doc.data()
                });
            });
            this.messageService.close();
        });
    }


    openCreateHotelModal(hotel: any | null = null) {
        const dialogRef = this.dialog.open(HotelDetailsComponent, {
            minWidth: '600px',
            maxWidth: '80%',
            data: {
                hotel,
            },
        });

        dialogRef.closed.subscribe((result: any) => {
            if (result) {
                this.messageService.showSuccess(result);
                this.hotels = [];
                this.hotelSubscription.unsubscribe();
                this.searchHotels();
            }
        });

    }

    searchHotels() {
        this.hotels = [];
        this.hotelSubscription = this.hotelService.getHotelsByUser(this.userId as string).subscribe(
            (hotelsSnapshot: any) => {
                hotelsSnapshot.forEach((hotelData: any) => {
                    this.hotels.push({
                        id: hotelData.payload.doc.id,
                        ...hotelData.payload.doc.data()
                    });
                });
                this.hotels = !this.searchCriteria.name ? this.hotels : this.hotels.filter((hotel: Hotel) => hotel.name.toLowerCase().includes(this.searchCriteria.name.toLowerCase()));
                this.removeRepeatedHotels();
            }
        )
    }

    removeRepeatedHotels() {
        this.hotels = this.hotels.filter((valor, indice, self) => {
            return self.findIndex((elemento) => elemento.id === valor.id) === indice;
        });
    }

}
