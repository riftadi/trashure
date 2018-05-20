import { Component, OnInit } from '@angular/core';
import {ScoresService} from "../../services/scores/scores.service";
import {Trophy} from "../../models/trophy";

@Component({
  selector: 'app-trophy-room',
  templateUrl: './trophy-room.component.html',
  styleUrls: ['./trophy-room.component.css']
})
export class TrophyRoomComponent implements OnInit {

  trophies: Trophy[];

  constructor(private scores: ScoresService) { }

  ngOnInit() {
    this.scores.getTrophies().subscribe(x => this.trophies = x);
  }

}
