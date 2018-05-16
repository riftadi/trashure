import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns = ['position', 'name', 'score'];
  // HARDCODED FOR NOW
  dataSource = HIGHSCORE_DATA;

  constructor() { }

  ngOnInit() {
  }

}

export interface HighScore {
  position: number;
  name: string;
  score: number;
}

const HIGHSCORE_DATA: HighScore[] = [
  {position: 1, name: 'Cool guy', score: 500},
  {position: 2, name: 'Less cool guy', score: 400},
  {position: 3, name: 'Uncool guy', score: 340},
  {position: 4, name: 'Subzero guy', score: 300}
];
