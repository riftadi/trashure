import { Component, OnInit, ViewChild, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { ScoreTypes } from '../../models/scoretypes'
import {Game} from "../../models/game";
import {TrashBin} from "../../models/trashbin";
import {environment} from "../../../environments/environment";
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-streetview',
  templateUrl: './streetview.component.html',
  styleUrls: ['./streetview.component.css']
})
export class StreetviewComponent implements OnInit {

  @ViewChild('streetviewMap') streetviewMap: any;
  @ViewChild('streetviewPano') streetviewPano: any;
  @Input() game: Game;
  @Input() zoom: number = 14;
  @Input() heading: number = 34;
  @Input() pitch: number = 10;
  @Input() scrollwheel: boolean = false;
  @Output() scoreEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() mapsReady = new EventEmitter();
  apiKey = environment.mapsApiKey;
  google: any;
  map: any;
  bounds: any;
  streetview: any;
  lastPosition: any;
  hasMoved: boolean = false;
  coins = {};
  markedBins: TrashBin[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private mapsAPILoader: MapsAPILoader, private gameService: GameService) { }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.mapsAPILoader.load().then(() => {
        this.google = window['google'];
        this.initMap();
        this.initStreetview();
        this.addCoins();
        this.mapsReady.emit();
      });
    }
  }

  initMap() {
    this.map = new this.google.maps.Map(
      this.streetviewMap.nativeElement, {
        center: { lat: this.game.area.latitudeStart, lng: this.game.area.longitudeStart },
        zoom: this.zoom,
        fullscreenControl: false,
        scrollwheel: this.scrollwheel
      });

    this.bounds = new this.google.maps.LatLngBounds(
      new this.google.maps.LatLng(this.game.area.latitudeStart, this.game.area.longitudeStart),
      new this.google.maps.LatLng(this.game.area.latitudeEnd, this.game.area.longitudeEnd)
    );

    var rectangle = new this.google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      bounds: this.bounds
    });
  }

  saveTrashBin() {
    let panoId = this.streetview.getPano();
    let lat = this.streetview.getPosition().lat();
    let lng = this.streetview.getPosition().lng();
    let heading = this.streetview.getPov().heading;
    let pitch = this.streetview.getPov().pitch;
    let zoom = this.streetview.getPov().zoom;
    let bin = <TrashBin> {pano: panoId, latitude: lat, longitude: lng, heading: heading, pitch: pitch, fov: 90 - (zoom * 20)};
    this.markedBins.push(bin);
    this.gameService.markBin(bin).subscribe(x => {
      if(x.verified) this.scoreEvent.emit(ScoreTypes.TRASHBIN);
    });
  }

  initStreetview() {
    this.streetview = new this.google.maps.StreetViewPanorama(
      this.streetviewPano.nativeElement, {
        position: { lat: this.game.area.latitudeStart, lng: this.game.area.longitudeStart },
        pov: { heading: this.heading, pitch: this.pitch },
        fullscreenControl: false,
        motionTrackingControl: false,
        addressControl: false,
        scrollwheel: this.scrollwheel,
        linksControl: false
      });
    this.map.setStreetView(this.streetview);

    this.lastPosition = this.streetview.getPosition();

    let context = this;

    this.streetview.addListener('position_changed', function() {
      if (context.bounds.contains(context.streetview.getPosition()))
      {
        context.lastPosition = context.streetview.getPosition();
      }else if(this.hasMoved){
        console.log("Tried to move out of bounds");
        alert("Please stay inside the task region");
        context.streetview.setPosition(context.lastPosition);
      }
      this.hasMoved = true;
    });

  }

  addCoins() {
    var icon = {
      url: "assets/images/nyannyannyannyan.gif",
      scaledSize: new this.google.maps.Size(50, 50), // scaled size
      origin: new this.google.maps.Point(0,0), // origin
      anchor: new this.google.maps.Point(0, 0) // anchor
    };

    for(let i = 0;i<=100;i++) {
      let coinMarker = new this.google.maps.Marker({
        id: i,
        position: {lat: this.game.area.latitudeStart + (Math.random() * i / 1000), lng: this.game.area.longitudeStart  + (Math.random() * i / 1000)},
        map: this.streetview,
        icon: icon,
        title: 'Coin'
      });

      let context = this;
      coinMarker.addListener('click', function() {
        coinMarker.setMap(null);
        context.scoreEvent.emit(ScoreTypes.COIN);
      });
    }
  }

}
