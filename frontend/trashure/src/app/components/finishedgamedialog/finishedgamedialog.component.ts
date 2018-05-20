import { Component, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-finishedgamedialog',
  templateUrl: './finishedgamedialog.component.html',
  styleUrls: ['./finishedgamedialog.component.css']
})
export class FinishedGameDialogComponent {

  disable = false;

  constructor(
    public dialogRef: MatDialogRef<FinishedGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private game: GameService) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.router.navigate(['/game/menu']);
  }

  onYesClick(): void {
    this.disable = true;
    this.game.getGame().subscribe(x => {
      this.game.startGame(x);
      this.dialogRef.close();
    });
  }

}
