import { Component, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FinishedGameDialogComponent} from "../finishedgamedialog/finishedgamedialog.component";
import {GameService} from "../../services/game/game.service";
import {Router} from "@angular/router";
import {Game} from "../../models/game";

@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent {

  TIME_LIMIT: number = 300;
  score: number = 0;
  latitude: number;
  longitude: number;
  timer: number = this.TIME_LIMIT;
  finished: boolean = false;
  gameObject: Game;

  constructor(private cdRef:ChangeDetectorRef, public game: GameService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    if(this.game.currentGame) {
      this.gameObject = this.game.currentGame;
      this.game.currentGame = null;
    } else {
      this.router.navigate(['/game/menu']);
    }
  }

  resetGame() {
    this.score = 0;
    this.timer = this.TIME_LIMIT;
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
    this.gameObject = null;
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


