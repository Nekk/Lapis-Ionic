import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { ScanQRReturnPage } from '../scan-qrreturn/scan-qrreturn';
import { ScanQRRentPage } from '../scan-qrrent/scan-qrrent';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    users: any;
    constructor(public navCtrl: NavController,
        public fb: AngularFireDatabase) {

        this.GetDataFromFireBase()

    }

    GetDataFromFireBase() {
        this.fb.object('/coderef').valueChanges().subscribe(data => {
            console.log(data);
            this.users = data;
            // console.log(this.users);
        }
        )
    }

    goToRent(params) {
        if (!params) params = {};
        this.navCtrl.push(RentPage);
    }
    goToScanQRReturn(params) {
        if (!params) params = {};
        this.navCtrl.push(ScanQRReturnPage);
    }
    goToScanQRRent(params) {
        if (!params) params = {};
        this.navCtrl.setRoot(ScanQRRentPage);
    }
}
