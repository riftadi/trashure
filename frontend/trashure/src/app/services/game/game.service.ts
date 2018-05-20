import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import {Game} from "../../models/game";
import {GameModes} from "../../models/gamemodes";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public currentGame: Game;

  constructor(private router: Router) { }

  getGame() : Observable<Game> {
    //return this.http.get('/api/game/start').map(x => <Game>x);
    let tempGame = {
      id: 0,
      gamemode: 0,
      area: {
        longitudeStart: 4.882384 ,
        latitudeStart: 52.366133,
        longitudeEnd: 4.924450,
        latitudeEnd: 52.383144
      }
    };
    return Observable.of(tempGame);
  }
  
  startGame(game: Game) : void {
    this.currentGame = game;
    switch(game.gamemode) {
      case GameModes.EXPLORATION:
        this.router.navigate(['/game/exploration']);
        break;
    }
  }
}
