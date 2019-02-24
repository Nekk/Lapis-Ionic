import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanQRReturnPage } from '../scan-qrreturn/scan-qrreturn';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner'
import { ScanQRRentPage } from '../scan-qrrent/scan-qrrent';
import { AngularFireDatabase, } from 'angularfire2/database';
import firebase from 'firebase';

@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html'
})
export class RentPage {
  options: BarcodeScannerOptions;
  encodeTExt: string = "";
  encodedData: any = {};
  scannedData: any = {};
  coderef: any = {};
  timerVar;
  timerSec;
  timerMin;
  timeHrs;
  datetime: String;
  totaltime;
  result = "00:00:00";
  buttonClicked: boolean = false;
  flagruntime: boolean = false;
  query = true;

  constructor(public navCtrl: NavController, public scanner: BarcodeScanner, public fb: AngularFireDatabase) {
    this.GetDataFromFireBase()
    console.log(this.datetime = new Date().toISOString())
  }

  GetDataFromFireBase() {
    this.fb.object('/coderef').valueChanges().subscribe(data => {
      this.coderef = data;
      console.log(this.coderef);
    }
    )
  }

  scanrent() {
    this.scannedData = null;
    this.options = {
      prompt: 'Scan you barcode'
    };

    this.scanner.scan(this.options).then((data) => {

      this.scannedData = data;

      if (this.scannedData != null && this.flagruntime == false) {

        this.checkIfRefExists(this.scannedData)
        this.flagruntime = true;

      } else if (this.scannedData != null && this.flagruntime == true) {
        //renew
      }
    }, (err) => {
      console.log("Error : ", err);
    })
  }

  // edit(key, name) {
  //   this.coderef = this.fb.list('/coderef');
  //   this.coderef.update(key, { name: name });
  // }

  writeUserData(userId, motorin, motorout, checksensor, ref) {
    firebase.database().ref('coderef/' + userId).set({
      motorin: motorin,
      motorout: motorout,
      checksensor: checksensor,
      ref: ref
    });
  }

  checkIfRefExists(ref) {
    this.coderef.map(data => {
      this.query = data;
      if (data.ref === ref.text) {
        this.writeUserData(0, false, true, false, "dOwlMd")
        this.startTimer();
      }
    })
  }


  scanstop() {
    this.options = {
      prompt: 'Scan you barcode'
    };

    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      if (this.scannedData != null && this.flagruntime == true) {
        this.timerVar.unsubscribe();
        this.writeUserData(0, true, false, false, "dOwlMd")
        stop();
        return this.scannedData = null, this.flagruntime = false, this.result = "00:00:00", this.buttonClicked = false;
      }
    }, (err) => {
      console.log("Error : ", err);
    })
  }
  stop() {
    this.timerVar.unsubscribe();
    this.writeUserData(0, false, false, true, "dOwlMd")
    return this.result = "00:00:00", this.buttonClicked = false;
  }
  startTimer() {
    if (stop()) {
      this.timerVar.unsubscribe();
      stop();
    } else if (this.buttonClicked) {
    } else {
      this.buttonClicked = true;
      this.timerVar = Observable.interval(1000).subscribe(x => {

        this.timerSec = x;
        var hours = Math.floor(this.timerSec / 3600);
        var minutes = Math.floor((this.timerSec - (hours * 3600)) / 60);
        var seconds = this.timerSec - (hours * 3600) - (minutes * 60);


        var result = this.twoDigits(hours);
        result += ":" + this.twoDigits(minutes);
        result += ":" + this.twoDigits(seconds);
        this.result = result;
      })
    }


  }
  twoDigits(n) {
    return (n <= 9 ? "0" + n : n);
  }
  secondsToHms(d) {
    var totalSeconds = d;
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    var result = this.twoDigits(hours);
    result += ":" + this.twoDigits(minutes);
    result += ":" + this.twoDigits(seconds);

    return result;
  }



  goToScanQRRent(params) {
    if (!params) params = {};
    this.navCtrl.push(ScanQRRentPage);
  }

  goToScanQRReturn(params) {
    if (!params) params = {};
    this.navCtrl.push(ScanQRReturnPage);
  }
}
