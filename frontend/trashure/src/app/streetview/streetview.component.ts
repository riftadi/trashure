// based on https://developers.google.com/maps/documentation/javascript/examples/streetview-simple

import { Component, OnInit, ViewChild, Input, Inject, PLATFORM_ID } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-streetview',
  templateUrl: './streetview.component.html',
  styleUrls: ['./streetview.component.css']
})
export class StreetviewComponent implements OnInit {

  @ViewChild('streetviewMap') streetviewMap: any;
  @ViewChild('streetviewPano') streetviewPano: any;
  @Input() latitude: number = 42.345573;
  @Input() longitude: number = -71.098326;
  @Input() zoom: number = 11;
  @Input() heading: number = 34;
  @Input() pitch: number = 10;
  @Input() scrollwheel: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.mapsAPILoader.load().then(() => {
        let center = { lat: this.latitude, lng: this.longitude };
        let map = new window['google'].maps.Map(this.streetviewMap.nativeElement, { center: center, zoom: this.zoom, scrollwheel: this.scrollwheel });
        let panorama = new window['google'].maps.StreetViewPanorama(
          this.streetviewPano.nativeElement, {
            position: center,
            pov: { heading: this.heading, pitch: this.pitch },
            scrollwheel: this.scrollwheel
          });
        map.setStreetView(panorama);
      });
    }
  }
}
