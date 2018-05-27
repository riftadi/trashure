import { HttpClient } from '@angular/common/http';
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

  getHighScores() : Observable<any> {
    return this.http.get('/api/scores/highscores');
  }

  getTrophies() : Observable<any> {
    return this.http.get('/api/scores/trophies');
  }
}
