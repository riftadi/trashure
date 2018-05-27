import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import {Game} from "../../models/game";
import {GameModes} from "../../models/gamemodes";
import {Router} from "@angular/router";
import {TrashBin} from "../../models/trashbin";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public currentGame: Game;

  constructor(private http: HttpClient, private router: Router) { }

  getGame() : Observable<Game> {
    return this.http.get('/api/game/start').map(x => <Game>x);
  }

  endGame(gameId, score) : Observable<any> {
    return this.http.post('/api/game/end', {id: gameId, score: score});
  }

  markBin(trashbin: TrashBin) : Observable<any> {
    return this.http.post('/api/game/trashbin', trashbin);
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
