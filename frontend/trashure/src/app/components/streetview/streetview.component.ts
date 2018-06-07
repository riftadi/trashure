import { Component, OnInit, ViewChild, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { ScoreTypes } from '../../models/scoretypes'
import {Game} from "../../models/game";
import {TrashBin} from "../../models/trashbin";
import {environment} from "../../../environments/environment";
import {GameService} from "../../services/game/game.service";
import {Raycast} from "../../helpers/raycast";

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
  drawing: boolean = false;
  dragging: boolean = false;
  rectangleWidth = 0;
  rectangleTop = 0;
  rectangleHeight = 0;
  rectangleLeft = 0;
  startX = 0;
  startY = 0;
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
    let rectangle = {
      height: this.rectangleHeight,
      width: this.rectangleWidth,
      top: this.rectangleTop,
      left: this.rectangleLeft,
      imageWidth: this.streetviewPano.nativeElement.width,
      imageHeight:  this.streetviewPano.nativeElement.height
    };
    console.log('Rectangle', rectangle);
    let panoId = this.streetview.getPano();
    let lat = this.streetview.getPosition().lat();
    let lng = this.streetview.getPosition().lng();
    let heading = this.streetview.getPov().heading;
    let pitch = this.streetview.getPov().pitch;
    let fov = (180/Math.pow(2,this.streetview.getPov().zoom));
    let height = this.streetviewPano.nativeElement.offsetHeight;
    let width = this.streetviewPano.nativeElement.offsetWidth;
    console.log('width', width);
    console.log('height', height);
    let r = new Raycast(heading, pitch, width/2, height/2, fov, width/height);
    console.log('r', r);
    let l = r.get_latlng(lat,lng);
    console.log('raycast loc', l);
    let bin = <TrashBin> {x: this.rectangleLeft, y: this.rectangleTop, width: this.rectangleWidth, height: this.rectangleHeight, pano: panoId, latitude: l.lat, longitude: l.lng, heading: heading, pitch: pitch, fov: fov, svHeight: height, svWidth: width};
    this.markedBins.push(bin);
    this.gameService.markBin(bin).subscribe(x => {
      if(x.verified) this.scoreEvent.emit(ScoreTypes.TRASHBIN);
    });
    this.toggleDrawing()
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

  toggleDrawing() {
    this.drawing = !this.drawing;
    if(!this.drawing) {
      this.resetRectangle();
    }
  }

  startDrawing(event) {
    this.resetRectangle()
    this.dragging = true;
    this.rectangleLeft = event.pageX;
    this.rectangleTop = event.pageY;
    this.startX = this.rectangleLeft;
    this.startY = this.rectangleTop;
  }

  draw(event) {
    if(this.dragging) {
      this.rectangleWidth = Math.abs(event.pageX - this.startX);
      this.rectangleHeight = Math.abs(event.pageY -  this.startY);
      this.rectangleLeft = (event.pageX - this.startX < 0) ? event.pageX : this.startX;
      this.rectangleTop = (event.pageY -  this.startY < 0) ? event.pageY : this.startY;
    }
  }

  resetRectangle() {
    this.rectangleWidth = 0;
    this.rectangleTop = 0;
    this.rectangleHeight = 0;
    this.rectangleLeft = 0;
    this.startX = 0;
    this.startY = 0;
  }

  stopDrawing() {
    this.dragging = false;
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
