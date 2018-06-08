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

  getGame(verificationMode: boolean) : Observable<Game> {
    if(verificationMode) {
      let tempBins = [
        {"x":326,"y":89,"width":244,"height":326,"pano":"vBonSsrbNPYEEDlNaKGXZg","latitude":52.36108006918838,"longitude":4.885101268729473,"heading":63.70519417524919,"pitch":-8.590772433767938,"fov":22.5,"svHeight":500,"svWidth":897},
        {"x":462,"y":154,"width":125,"height":191,"pano":"mPnFDadUzI2qia-CVoc2qw","latitude":52.36115665804972,"longitude":4.8840412608393065,"heading":2.134025656859831,"pitch":-11.345334235201321,"fov":40.37999999999999,"svHeight":500,"svWidth":897}
      ].map(x => <TrashBin>x);
      let tempGame = {
        id: 0,
        gamemode: 1,
        trashbins: tempBins
      };
      return Observable.of(<Game> tempGame);
    }
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
      case GameModes.VERIFICATION:
        this.router.navigate(['/game/verification']);
        break;
    }
  }
}
