import { Component, OnInit } from '@angular/core';
import {HighScore} from "../../models/highscore";
import {ScoresService} from "../../services/scores/scores.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns = ['position', 'name', 'score'];
  // HARDCODED FOR NOW
  dataSource: HighScore[];

  constructor(public scores: ScoresService) {
  }

  ngOnInit() {
    this.scores.getHighScores().subscribe(data => this.dataSource = data.Highscore.map(x => <HighScore[]>x));
  }

}
