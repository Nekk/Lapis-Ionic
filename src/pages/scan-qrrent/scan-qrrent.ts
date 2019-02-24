import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'
import { AngularFireDatabase } from 'angularfire2/database';

declare var firebase: any;

@Component({
  selector: 'page-scan-qrrent',
  templateUrl: 'scan-qrrent.html'
})
export class ScanQRRentPage {
  options: BarcodeScannerOptions;
  encodeTExt: string = '';
  encodedData: any = {};
  scannedData: any = {};

  outputifexist: string = '';

  usersRef: any = firebase.database().ref('users');

  constructor(public navCtrl: NavController, public scanner: BarcodeScanner, afdb: AngularFireDatabase) {
  }

  scan() {
    this.options = {
      prompt: 'Scan you barcode'
    };
    this.scanner.scan(this.options).then((data) => {
      this.checkRefExist()
      this.scannedData = data;
    }, (err) => {
      console.log("Error : ", err);
    })
  }

  checkRefExist() {
    var textref = firebase.database().ref("coderef");

    textref.once('value', function (snapshot) {
      if (snapshot.val().hasOwnProperty('Dfsedw')) {
        this.outputifexist = "Have in FB";
      }
      else {
        console.log("error not same in firebase");
      }
    });
  }

  encode() {
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodeTExt).then((data) => {
      this.encodedData = data;
    }, (err) => {
      console.log("Error : ", err);
    })

  }

  /*this.QRScanner.prepare()
  .then((status: QRScannerStatus) => {
    if (status.authorized) {
      // camera permission was granted


      // start scanning
      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
        console.log('Scanned something', text);

        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
      });

    } else if (status.denied) {
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there
    } else {
      // permission was denied, but not permanently. You can ask for permission again at a later time.
    }
  })
  .catch((e: any) => console.log('Error is', e));
*/

}
