import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import {HighScore} from "../../models/highscore";
import {TrashBin} from "../../models/trashbin";

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(public http: HttpClient) { }

  getHighScores() : Observable<HighScore[]> {
    //return this.http.get('/api/highscores').map(x => <HighScore[]>x);
    let tempScores = [
      {position: 1, name: 'Cool guy', score: 500},
      {position: 2, name: 'Less cool guy', score: 400},
      {position: 3, name: 'Uncool guy', score: 340},
      {position: 4, name: 'Subzero guy', score: 280}
    ].map(x => <HighScore>x);
    return Observable.of(tempScores);
  }
  getTrophies() : Observable<TrashBin[]> {
    //return this.http.get('/api/trophies').map(x => <Trophy[]>x);
    let tempTrophies = [
      {pano: 'QOBvP0vHHkcL5B1uW2aOiw', latitude: 52.391223, longitude: 4.921798, fov: 90, heading: 235, pitch: 10},
      {pano: 'QOBvP0vHHkcL5B1uW2aOiw', latitude: 52.36618375095483, longitude: 4.882405202676637, fov: 32.65092889724077, heading: 201.40994695665904, pitch: -14.134298035083347}
    ].map(x => <TrashBin>x);
    return Observable.of(tempTrophies);
  }
}
