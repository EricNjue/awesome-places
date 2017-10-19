import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PlaceModel} from "../../models/place";
import {PlacesService} from "../../services/places";


@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: PlaceModel;
  ind: number;

  constructor(public navParams: NavParams, private viewCtrl: ViewController,
              private placesService: PlacesService)
  {
    this.place = this.navParams.get('place');
    this.ind = this.navParams.get('indexvalue');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  onDelete() {
    this.placesService.deletePlace(this.ind);
    this.onLeave();
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }
}
