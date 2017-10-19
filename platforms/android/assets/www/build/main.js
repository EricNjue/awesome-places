webpackJsonp([3],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__set_location_set_location__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_places__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddPlacePage = (function () {
    function AddPlacePage(navCtrl, navParams, modalCtrl, geoLocation, loadingCtrl, toastCtrl, camera, placesService, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.geoLocation = geoLocation;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.placesService = placesService;
        this.file = file;
        this.location = { lat: 40.7624324, lng: -73.9759827 };
        this.locationIsSet = false;
        this.imageURL = '';
    }
    AddPlacePage.prototype.onSubmit = function (form) {
        console.log(form);
        this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageURL);
        form.reset();
        this.location = { lat: 40.7624324, lng: -73.9759827 };
        this.imageURL = '';
        this.locationIsSet = false;
    };
    AddPlacePage.prototype.onLocate = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Getting your location...'
        });
        loading.present();
        this.geoLocation.getCurrentPosition()
            .then(function (location) {
            loading.dismiss();
            _this.location.lat = location.coords.latitude;
            _this.location.lng = location.coords.longitude;
            _this.locationIsSet = true;
        })
            .catch(function (error) {
            loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Could not get location, please pick it manually!',
                duration: 2500
            });
            toast.present();
        });
    };
    AddPlacePage.prototype.onOpenMap = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__set_location_set_location__["a" /* SetLocationPage */], { location: this.location, isSet: this.locationIsSet });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.location = data.location;
                _this.locationIsSet = true;
            }
        });
    };
    AddPlacePage.prototype.onTakePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            // destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            // mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        };
        this.camera.getPicture(options)
            .then(function (imageData) {
            var currentName = imageData.replace(/^.*[\\\/]/, '');
            var path = imageData.replace(/[^\/]*$/, '');
            var newFileName = new Date().getUTCMilliseconds() + '.jpg';
            _this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
                .then(function (data) {
                _this.imageURL = data.nativeURL;
                _this.camera.cleanup();
            })
                .catch(function (err) {
                _this.imageURL = '';
                var toast = _this.toastCtrl.create({
                    message: 'Could not save the image. Please try again',
                    duration: 2500
                });
                toast.present();
                _this.camera.cleanup();
            });
            console.log(imageData);
            _this.imageURL = imageData;
        })
            .catch(function (error) {
            _this.imageURL = '';
            var toast = _this.toastCtrl.create({
                message: 'Could not get the image. Please try again',
                duration: 2500
            });
            toast.present();
            _this.camera.cleanup();
        });
    };
    return AddPlacePage;
}());
AddPlacePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-place',template:/*ion-inline-start:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\add-place\add-place.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add a place</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSubmit(f)">\n    <ion-list>\n      <ion-item>\n        <ion-label fixed>Title</ion-label>\n        <ion-input type="text" placeholder="beautiful church" ngModel required name="title"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Short Description</ion-label>\n        <ion-textarea name="description" ngModel required></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button block outline type="button" icon-left (click)="onLocate()">\n            <ion-icon name="locate"></ion-icon>\n            Locate Me\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button block outline type="button" icon-left (click)="onOpenMap()">\n            <ion-icon name="map"></ion-icon>\n            Select on Map\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="locationIsSet">\n        <ion-col>\n         <agm-map [latitude]="location.lat" [longitude]="location.lng" [zoom]="16">\n           <agm-marker [latitude]="location.lat" [longitude]="location.lng"></agm-marker>\n         </agm-map>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <h5>Take a Photo!</h5>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left block outline type="button" (click)="onTakePhoto()">\n            <ion-icon name="camera"></ion-icon>\n            Open Camera\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="imageURL != \'\'">\n        <ion-col>\n          <img [src]="imageURL">\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button [disabled]="!f.valid || !locationIsSet || imageURL== \'\'" ion-button type="submit" color="secondary" block>\n            Add this place\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\add-place\add-place.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_5__services_places__["a" /* PlacesService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
], AddPlacePage);

//# sourceMappingURL=add-place.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_location__ = __webpack_require__(264);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SetLocationPage = (function () {
    function SetLocationPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.location = this.navParams.get('location');
        if (this.navParams.get('isSet')) {
            this.marker = this.location;
        }
    }
    SetLocationPage.prototype.onSetMarker = function (event) {
        this.marker = new __WEBPACK_IMPORTED_MODULE_2__models_location__["a" /* LocationModel */](event.coords.lat, event.coords.lng);
    };
    SetLocationPage.prototype.onConfirm = function () {
        this.viewCtrl.dismiss({ location: this.marker });
    };
    SetLocationPage.prototype.onAbort = function () {
        this.viewCtrl.dismiss();
    };
    return SetLocationPage;
}());
SetLocationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-set-location',template:/*ion-inline-start:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\set-location\set-location.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Choose Location</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <agm-map [latitude]="location.lat" [longitude]="location.lng" [zoom]="16" (mapClick)="onSetMarker($event)">\n            <agm-marker *ngIf="marker" [latitude]="marker.lat" [longitude]="marker.lng"></agm-marker>\n        </agm-map>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button [disabled]="!marker" ion-button block color="secondary" (click)="onConfirm()">Confirm</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button block color="danger" (click)="onAbort()">Abort</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\set-location\set-location.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
], SetLocationPage);

//# sourceMappingURL=set-location.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_places__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlacePage = (function () {
    function PlacePage(navParams, viewCtrl, placesService) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.placesService = placesService;
        this.place = this.navParams.get('place');
        this.ind = this.navParams.get('indexvalue');
    }
    PlacePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PlacePage');
    };
    PlacePage.prototype.onDelete = function () {
        this.placesService.deletePlace(this.ind);
        this.onLeave();
    };
    PlacePage.prototype.onLeave = function () {
        this.viewCtrl.dismiss();
    };
    return PlacePage;
}());
PlacePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-place',template:/*ion-inline-start:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\place\place.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{place.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-grid>\n  <ion-row>\n    <ion-col text-center>\n      <img [src]="place.imagePath">\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <p>{{place.description}}</p>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <agm-map [latitude]="place.location.lat" [longitude]="place.location.lng" [zoom]="16">\n        <agm-marker [latitude]="place.location.lat" [longitude]="place.location.lng"> </agm-marker>\n      </agm-map>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <button ion-button block (click)="onLeave()">Leave</button>\n    </ion-col>\n    <ion-col>\n      <button ion-button block color="danger" (click)="onDelete()">Delete</button>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\place\place.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__services_places__["a" /* PlacesService */]])
], PlacePage);

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-place/add-place.module": [
		300,
		2
	],
	"../pages/place/place.module": [
		301,
		1
	],
	"../pages/set-location/set-location.module": [
		302,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 166;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_place_add_place__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_places__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__place_place__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, placesService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.placesService = placesService;
        this.modalCtrl = modalCtrl;
        this.addPlacePage = __WEBPACK_IMPORTED_MODULE_2__add_place_add_place__["a" /* AddPlacePage */];
        this.places = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.placesService.fetchPlaces()
            .then(function (places) {
            _this.places = places;
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.places = this.placesService.loadPlaces();
    };
    HomePage.prototype.onOpenPlace = function (place, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__place_place__["a" /* PlacePage */], { place: place, indexvalue: index });
        modal.present();
        modal.onDidDismiss(function () {
            _this.places = _this.placesService.loadPlaces();
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons end>\n      <button ion-button icon-only [navPush]="addPlacePage">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Awesome Places\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngFor="let place of places; let i= index" (click)="onOpenPlace(place, i)">\n    <img [src]="place.imagePath">\n    <ion-card-content text-center>\n      <ion-card-title>\n        {{place.title}}\n      </ion-card-title>\n      <p>{{place.description}}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_places__["a" /* PlacesService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(240);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_add_place_add_place__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_place_place__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_set_location_set_location__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__agm_core__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_places__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_add_place_add_place__["a" /* AddPlacePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_place_place__["a" /* PlacePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_set_location_set_location__["a" /* SetLocationPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-place/add-place.module#AddPlacePageModule', name: 'AddPlacePage', segment: 'add-place', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/place/place.module#PlacePageModule', name: 'PlacePage', segment: 'place', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/set-location/set-location.module#SetLocationPageModule', name: 'SetLocationPage', segment: 'set-location', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_10__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyCepV4f569b1-RlDlj7zRBQgWssWeJULP8'
            }),
            __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_add_place_add_place__["a" /* AddPlacePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_place_place__["a" /* PlacePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_set_location_set_location__["a" /* SetLocationPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_13__services_places__["a" /* PlacesService */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationModel; });
var LocationModel = (function () {
    function LocationModel(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return LocationModel;
}());

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceModel; });
var PlaceModel = (function () {
    function PlaceModel(title, description, location, imagePath) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.imagePath = imagePath;
    }
    return PlaceModel;
}());

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\MCM_DEV\Desktop\angular_step_by_step\the-basics\ionic-start\awesome-places\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_place__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlacesService = (function () {
    function PlacesService(storage, file) {
        this.storage = storage;
        this.file = file;
        this.places = [];
    }
    PlacesService.prototype.addPlace = function (title, description, location, imageUrl) {
        var _this = this;
        var place = new __WEBPACK_IMPORTED_MODULE_1__models_place__["a" /* PlaceModel */](title, description, location, imageUrl);
        this.places.push(place);
        this.storage.set('places', this.places)
            .then(function (data) {
        })
            .catch(function (error) {
            _this.places.splice(_this.places.indexOf(place), 1);
        });
    };
    PlacesService.prototype.loadPlaces = function () {
        return this.places.slice();
    };
    PlacesService.prototype.fetchPlaces = function () {
        var _this = this;
        return this.storage.get('places')
            .then(function (places) {
            _this.places = places != null ? places : [];
            return _this.places;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    PlacesService.prototype.deletePlace = function (index) {
        var _this = this;
        var place = this.places[index];
        this.places.splice(index, 1);
        this.storage.set('places', this.places)
            .then(function () {
            _this.removeFile(place);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    PlacesService.prototype.removeFile = function (place) {
        var _this = this;
        var currentName = place.imagePath.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(function () {
            console.log('Removed file');
        })
            .catch(function (error) {
            console.log('Error while removing file');
            _this.addPlace(place.title, place.description, place.location, place.imagePath);
        });
    };
    return PlacesService;
}());
PlacesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */]])
], PlacesService);

//# sourceMappingURL=places.js.map

/***/ })

},[221]);
//# sourceMappingURL=main.js.map