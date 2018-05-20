import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-trashure-menu',
  templateUrl: './trashure-menu.component.html',
  styleUrls: ['./trashure-menu.component.css']
})
export class TrashureMenuComponent implements OnInit {

  constructor(public game: GameService) { }

  ngOnInit() {
  }

  startGame() {
    this.game.getGame().subscribe(x => this.game.startGame(x));
  }

}
