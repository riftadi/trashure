import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './/app-routing.module';

import { AgmCoreModule } from '@agm/core';

import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {TrashureMenuComponent} from "./components/trashure-menu/trashure-menu.component";
import {ExplorationComponent} from "./components/exploration/exploration.component";
import {StreetviewComponent} from "./components/streetview/streetview.component";
import {FinishedGameDialogComponent} from './components/finishedgamedialog/finishedgamedialog.component';
import {ScoresService} from "./services/scores.service";


@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    TrashureMenuComponent,
    ExplorationComponent,
    StreetviewComponent,
    FinishedGameDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKv-vShjESv1Hwkn3FCqPUj-Ff7BW17ic'
    }),
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    AppRoutingModule
  ],
  entryComponents: [
    FinishedGameDialogComponent,
  ],
  providers: [ScoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
