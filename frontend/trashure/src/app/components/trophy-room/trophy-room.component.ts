import { Component, OnInit, Input } from '@angular/core';
import {ScoresService} from "../../services/scores/scores.service";
import {TrashBin} from "../../models/trashbin";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-trophy-room',
  templateUrl: './trophy-room.component.html',
  styleUrls: ['./trophy-room.component.css']
})
export class TrophyRoomComponent implements OnInit {

  @Input() trophies: TrashBin[];
  apiKey = environment.mapsApiKey;

  constructor(private scores: ScoresService) { }

  ngOnInit() {
    if(!this.trophies) {
      this.scores.getTrophies().subscribe(x => this.trophies = x);
    }
  }

}
