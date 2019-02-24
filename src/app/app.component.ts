import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RentPage } from '../pages/rent/rent';
import { ScanQRRentPage } from '../pages/scan-qrrent/scan-qrrent'
import { ScanQRReturnPage } from '../pages/scan-qrreturn/scan-qrreturn';
import { CartPage } from '../pages/cart/cart';
import { CloudPage } from '../pages/cloud/cloud';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AccountPage } from '../pages/account/account';
import { AuthService } from '../services/auth.service';



import { HomePage } from '../pages/home/home';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any = HomePage;


  private menu: MenuController;


  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthService,
    menu: MenuController) {
    this.menu = menu;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );


  }
  login() {
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

  goToHome(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }
  goToRent(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(RentPage);
  }
  goToScanQRReturn(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ScanQRReturnPage);
  }
  goToCart(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(CartPage);
  }
  goToCloud(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(CloudPage);
  }
  // goToLogin(params) {
  //   if (!params) params = {};
  //   this.navCtrl.setRoot(LoginPage);
  // }
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SignupPage);
  }
  goToAccount(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AccountPage);
  }
  goToScanQRRent(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ScanQRRentPage);
  }
}
