import { Component, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-finishedgamedialog',
  templateUrl: './finishedgamedialog.component.html',
  styleUrls: ['./finishedgamedialog.component.css']
})
export class FinishedGameDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FinishedGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.router.navigate(['']);
  }

  onYesClick(): void {
    location.reload();
  }

}
