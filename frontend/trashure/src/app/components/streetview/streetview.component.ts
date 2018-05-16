import { Component, OnInit, ViewChild, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { ScoreTypes } from '../../models/scoretypes'

@Component({
  selector: 'app-streetview',
  templateUrl: './streetview.component.html',
  styleUrls: ['./streetview.component.css']
})
export class StreetviewComponent implements OnInit {

  @ViewChild('streetviewMap') streetviewMap: any;
  @ViewChild('streetviewPano') streetviewPano: any;
  @Input() latitude: number = 52.391223;
  @Input() longitude: number = 4.921798;
  @Input() zoom: number = 14;
  @Input() heading: number = 34;
  @Input() pitch: number = 10;
  @Input() scrollwheel: boolean = false;
  @Output() scoreEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() mapsReady = new EventEmitter();
  google: any;
  map: any;
  streetview: any;
  coins = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private mapsAPILoader: MapsAPILoader) { }

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
        center: { lat: this.latitude, lng: this.longitude },
        zoom: this.zoom,
        streetViewControl: true,
        scrollwheel: this.scrollwheel
      });
  }

  initStreetview() {

    this.streetview = new this.google.maps.StreetViewPanorama(
      this.streetviewPano.nativeElement, {
        position: { lat: this.latitude, lng: this.longitude },
        pov: { heading: this.heading, pitch: this.pitch },
        scrollwheel: this.scrollwheel
      });
    this.map.setStreetView(this.streetview);
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
        position: {lat: this.latitude + (Math.random() * i / 1000), lng: this.longitude  + (Math.random() * i / 1000)},
        map: this.streetview,
        icon: icon,
        title: 'Coin'
      });

      //this.coins[i] = coinMarker;

      let context = this;
      coinMarker.addListener('click', function() {
        coinMarker.setMap(null);
        context.scoreEvent.emit(ScoreTypes.COIN);
      });
    }
  }

}
