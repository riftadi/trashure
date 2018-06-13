import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FinishedGameDialogComponent} from "../finishedgamedialog/finishedgamedialog.component";
import {GameService} from "../../services/game/game.service";
import {Router} from "@angular/router";
import {Game} from "../../models/game";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent {

  @ViewChild('tutorialModal') tutorialModal: any;
  TIME_LIMIT: number = 60;
  score: number = 0;
  latitude: number;
  longitude: number;
  timer: number = this.TIME_LIMIT;
  finished: boolean = false;
  gameObject: Game;
  tutorialIndex = 0;
  hasNextSlide = true;
  tutorialFinished = false;
  paused = false;

  constructor(private cdRef:ChangeDetectorRef, public game: GameService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    if(this.game.currentGame) {
      this.gameObject = this.game.currentGame;
      console.log(this.gameObject);
      this.showTutorial();
    } else {
      this.router.navigate(['/game/menu']);
    }
  }

  showTutorial() {
    this.paused = true;
    this.tutorialIndex = 0;
    this.tutorialFinished = false;
    $('#tutorialModal').modal();
  }

  nextTutorialSlide() {
    this.tutorialIndex++;
    if(this.tutorialIndex === 3) {
      this.hasNextSlide = false;
    }
  }

  closeTutorial() {
    this.paused = false;
    this.tutorialFinished = true;
    this.startTimer();
  }

  exitGame() {
    this.paused = true;
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
    if(this.tutorialFinished) {
      var interval = setInterval(() => {
        if(!this.paused) {
          this.timer--;
          if(this.timer === 0 ){
            clearInterval(interval);
            this.finishGame();
          };
        }
      }, 1000);
    }
  }

  finishGame() {
    let gameId = this.gameObject.id;
    this.gameObject = null;
    this.game.currentGame = null;
    this.game.endGame(gameId, this.score).subscribe(x => {
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
    });
  }

}


