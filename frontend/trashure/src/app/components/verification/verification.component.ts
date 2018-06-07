import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FinishedGameDialogComponent} from "../finishedgamedialog/finishedgamedialog.component";
import {GameService} from "../../services/game/game.service";
import {Router} from "@angular/router";
import {Game} from "../../models/game";
import {environment} from "../../../environments/environment";
import {TrashBin} from "../../models/trashbin";
import {ScoreTypes} from "../../models/scoretypes";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  TIME_LIMIT: number = 500;
  score: number = 0;
  timer: number = this.TIME_LIMIT;
  finished: boolean = false;
  gameObject: Game;
  apiKey = environment.mapsApiKey;
  activeBin: TrashBin;
  activeIndex:number = 0;

  constructor(private cdRef:ChangeDetectorRef, public game: GameService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    if(this.game.currentGame) {
      this.gameObject = this.game.currentGame;
      console.log(this.gameObject);
      this.activeBin = this.gameObject.trashbins[this.activeIndex];
      this.startTimer();
    } else {
      this.router.navigate(['/game/menu']);
    }
  }

  addScore() {
    this.score += ScoreTypes.TRASHBIN;
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

  correctClick() {
    if(this.activeIndex === this.gameObject.trashbins.length - 1) {
      this.finishGame();
    } else {
      this.activeIndex++;
      this.activeBin = this.gameObject.trashbins[this.activeIndex];
      this.addScore();
    }
  }

  misClick() {
    alert('Try again!');
  }

  resetGame() {
    this.score = 0;
    this.timer = this.TIME_LIMIT;
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
    let gameId = this.gameObject.id;
    this.gameObject = null;
    this.game.currentGame = null;
    let dialogRef = this.dialog.open(FinishedGameDialogComponent, {
      width: '250px',
      data: { score: this.score }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.game.currentGame) {
        this.gameObject = this.game.currentGame;
        this.resetGame();
      }
    });
  }

}
