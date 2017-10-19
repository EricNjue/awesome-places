import {LocationModel} from "./location";

export class PlaceModel{
  constructor(public title: string, public description: string,
              public location: LocationModel, public imagePath: string) {

  }
}
