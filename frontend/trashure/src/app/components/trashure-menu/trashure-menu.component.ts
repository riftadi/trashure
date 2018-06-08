import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-trashure-menu',
  templateUrl: './trashure-menu.component.html',
  styleUrls: ['./trashure-menu.component.css']
})
export class TrashureMenuComponent implements OnInit {

  startSlideAnimation: boolean = false;

  constructor(public game: GameService) { }

  ngOnInit() {
    this.playMusic();
  }

  ngAfterViewInit() {
    let ctx = this;
    setTimeout(function() {
      ctx.startSlideAnimation = true;
    }, 1000);
  }

  startGame(event) {
    console.log(event);
    switch(event.which) {
      case 1:
        this.game.getGame(false).subscribe(x => this.game.startGame(x));
        break;
      case 3:
        this.game.getGame(true).subscribe(x => this.game.startGame(x));
        break;
    }
  }

  playMusic() {
    let audio = new Audio();
    audio.src = "assets/sounds/music.wav";
    audio.loop = true;
    audio.load();
    audio.play();
  }

}
