import { Component, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FinishedGameDialogComponent} from "../finishedgamedialog/finishedgamedialog.component";

@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent {

  score: number = 0;
  latitude: number;
  longitude: number;
  timer: number = 100;
  finished: boolean = false;

  constructor(private cdRef:ChangeDetectorRef, public dialog: MatDialog) {
    this.latitude = 52.391223;
    this.longitude = 4.921798;
  }

  addScore(score) {
    this.score += score;
    // For some reason the template is not updated, so manually detect changes now
    this.cdRef.detectChanges();
    this.playCoinSound();
  }

  playCoinSound() {
    let audio = new Audio();
    audio.src = "assets/sounds/coin.mp3";
    audio.load();
    audio.play();
  }

  startTimer(){
    var interval = setInterval(() => {
      this.timer--;
      if(this.timer === 0 ){
        clearInterval(interval);
        this.finishGame();
      };
    }, 1000);
  }

  finishGame() {
    this.finished = true;
      let dialogRef = this.dialog.open(FinishedGameDialogComponent, {
        width: '250px',
        data: { score: this.score }
      });
  }

}


