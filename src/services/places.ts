import {Injectable} from "@angular/core";
import {PlaceModel} from "../models/place";
import {LocationModel} from "../models/location";
import {Storage} from "@ionic/storage";
import {File} from "@ionic-native/file";

declare var cordova: any;

@Injectable()
export class PlacesService {

  private places: PlaceModel[] = [];

  constructor(private storage: Storage, private file: File) {

  }

  addPlace(title:string, description: string, location: LocationModel, imageUrl: string) {
    const place = new PlaceModel(title,description,location,imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then(data=>{

      })
      .catch(error=>{
        this.places.splice(this.places.indexOf(place),1);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
   return this.storage.get('places')
      .then((places:PlaceModel[])=>{
        this.places = places!=null ? places : [];
        return this.places;
      })
      .catch(error=>{
        console.log(error);
      });
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(()=>{
          this.removeFile(place);
      })
      .catch(error=>{
        console.log(error);
      });
  }


  private removeFile(place: PlaceModel){
    const currentName = place.imagePath.replace(/^.*[\\\/]/,'');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(()=>{
        console.log('Removed file');
      })
      .catch((error)=>{
        console.log('Error while removing file');
        this.addPlace(place.title,place.description,place.location,place.imagePath);
      });
  }
}
