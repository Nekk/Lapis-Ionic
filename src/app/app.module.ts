import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { CloudPage } from '../pages/cloud/cloud';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { RentPage } from '../pages/rent/rent';
import { AccountPage } from '../pages/account/account';
import { ScanQRRentPage } from '../pages/scan-qrrent/scan-qrrent'
import { ScanQRReturnPage } from '../pages/scan-qrreturn/scan-qrreturn';

import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AngularFirestoreModule } from 'angularfire2/firestore';






var config = {
  apiKey: "AIzaSyDtqLL5v6-4aFP2BCv2KQjTdbAQqPrwD9o",
  authDomain: "lapis-1534399600481.firebaseapp.com",
  databaseURL: "https://lapis-1534399600481.firebaseio.com",
  projectId: "lapis-1534399600481",
  storageBucket: "lapis-1534399600481.appspot.com",
  messagingSenderId: "841149452977"

}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    CloudPage,
    LoginPage,
    SignupPage,
    RentPage,
    AccountPage,
    ScanQRRentPage,
    ScanQRReturnPage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    NgxErrorsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    CloudPage,
    LoginPage,
    SignupPage,
    RentPage,
    AccountPage,
    ScanQRRentPage,
    ScanQRReturnPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AuthService,
    AngularFireDatabase
  ]
})
export class AppModule { }