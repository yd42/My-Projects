import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AngularFireDatabase} from 'angularfire2/database';
import { Booking } from '../../models/Booking';

/**
 * Generated class for the ViewbookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewbooking',
  templateUrl: 'viewbooking.html',
})
export class ViewbookingPage {
  profileData: Observable<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
   private afAuth: AngularFireAuth, public toast: ToastController) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(userData => {
      if(userData && userData.email && userData.uid) {
        this.profileData = this.afDatabase.object(`Users/${userData.uid}/Booking`).valueChanges();
  }
})
  }

  removeBooking() {
    this.afAuth.authState.subscribe(userData => {
      this.afDatabase.object(`Users/${userData.uid}/Booking`).set({
        myDate: null,
        myTime: null,
        serviceOption: null,
        userNotes: null
      })
      .then(() => this.toast.create({
        message: `Booking successfully removed.`,
        duration: 2000
      }).present());
    })
  }
}