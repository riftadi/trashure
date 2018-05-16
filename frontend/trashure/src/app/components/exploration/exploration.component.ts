import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent {

  score: number = 0;
  latitude: number;
  longitude: number;

  constructor(private cdRef:ChangeDetectorRef) {
    this.latitude = 52.391223;
    this.longitude = 4.921798;
  }

  addScore(score) {
    this.score += score;
    this.cdRef.detectChanges();
    this.playCoinSound();
  }

  playCoinSound() {
    let audio = new Audio();
    audio.src = "assets/sounds/coin.mp3";
    audio.load();
    audio.play();
  }

}
