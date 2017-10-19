import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {LocationModel} from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {PlacesService} from "../../services/places";
import {Entry, File, FileError} from "@ionic-native/file";

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: LocationModel = { lat: 40.7624324, lng: -73.9759827};
  locationIsSet = false;
  imageURL = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              private geoLocation: Geolocation,private loadingCtrl: LoadingController,
              private toastCtrl: ToastController, private camera: Camera, private placesService: PlacesService, private file: File) {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageURL);
    form.reset();
    this.location = { lat: 40.7624324, lng: -73.9759827};
    this.imageURL = '';
    this.locationIsSet = false;
  }

  onLocate() {
    const loading = this.loadingCtrl.create({
       content: 'Getting your location...'
    });
    loading.present();
    this.geoLocation.getCurrentPosition()
        .then(location =>{
          loading.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        })
        .catch(error=>{
          loading.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        });
  }

  onOpenMap() {
     const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
     modal.present();
     modal.onDidDismiss( data => {
       if(data) {
         this.location = data.location;
         this.locationIsSet = true;
       }
     });
  }

  onTakePhoto() {
    const options: CameraOptions = {
      quality:100,
      // destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };
    this.camera.getPicture(options)
      .then(imageData =>{
        const currentName = imageData.replace(/^.*[\\\/]/,'');
        const path = imageData.replace(/[^\/]*$/,'');
        const newFileName = new Date().getUTCMilliseconds()+ '.jpg';
        this.file.moveFile(path,currentName,cordova.file.dataDirectory,newFileName)
          .then((data: Entry ) =>{
            this.imageURL = data.nativeURL;
            this.camera.cleanup();
          })
          .catch((err: FileError) => {
            this.imageURL = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save the image. Please try again',
              duration: 2500
            });
            toast.present();
            this.camera.cleanup();
          });
        console.log(imageData);
        this.imageURL = imageData;
      })
      .catch(error=>{
        this.imageURL = '';
        const toast = this.toastCtrl.create({
          message: 'Could not get the image. Please try again',
          duration: 2500
        });
        toast.present();
        this.camera.cleanup();
      });
  }
}
