import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp({"projectId":"hotel-manager-566e1","appId":"1:81150270702:web:763473a03fbb6b3afbe7ff","databaseURL":"https://hotel-manager-566e1-default-rtdb.firebaseio.com","storageBucket":"hotel-manager-566e1.appspot.com","apiKey":"AIzaSyAqzIqi1F1feCRyxUGiv4Mn6FFgnRiw8do","authDomain":"hotel-manager-566e1.firebaseapp.com","messagingSenderId":"81150270702"})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
