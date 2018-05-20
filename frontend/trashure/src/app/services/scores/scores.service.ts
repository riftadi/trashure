import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import {HighScore} from "../../models/highscore";
import {Trophy} from "../../models/trophy";

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
  getTrophies() : Observable<Trophy[]> {
    //return this.http.get('/api/trophies').map(x => <Trophy[]>x);
    let tempTrophies = [
      {imgUrl: "http://www.wensh.net/up/2/photo2008/081225~090101/IMG_0110.JPG", latitude: 52.391223, longitude: 4.921798},
      {imgUrl: "https://parkviewdc.files.wordpress.com/2016/01/img_9972.jpg", latitude: 52.391223, longitude: 4.921798}
    ].map(x => <Trophy>x);
    return Observable.of(tempTrophies);
  }
}
