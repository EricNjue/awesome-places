import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {PlaceModel} from "../../models/place";
import {PlacesService} from "../../services/places";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  addPlacePage = AddPlacePage;
  places: PlaceModel[] =[];

  constructor(public navCtrl: NavController, private placesService: PlacesService, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then((places: PlaceModel[]) =>{
        this.places = places;
      });
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: PlaceModel, index: number) {
     const modal = this.modalCtrl.create(PlacePage,{place:place, indexvalue: index});
     modal.present();
     modal.onDidDismiss(
      () => {
        this.places = this.placesService.loadPlaces();
      }
    );
  }
}
