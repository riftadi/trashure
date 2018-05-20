import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatDialogModule, MatFormFieldModule } from '@angular/material';

import { AppRoutingModule } from './/app-routing.module';

import { AgmCoreModule } from '@agm/core';

import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {TrashureMenuComponent} from "./components/trashure-menu/trashure-menu.component";
import {ExplorationComponent} from "./components/exploration/exploration.component";
import {StreetviewComponent} from "./components/streetview/streetview.component";
import {FinishedGameDialogComponent} from './components/finishedgamedialog/finishedgamedialog.component';
import { TrophyRoomComponent } from './components/trophy-room/trophy-room.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ScoresService} from "./services/scores/scores.service";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    TrashureMenuComponent,
    ExplorationComponent,
    StreetviewComponent,
    FinishedGameDialogComponent,
    TrophyRoomComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    AppRoutingModule
  ],
  entryComponents: [
    FinishedGameDialogComponent,
  ],
  providers: [
    ScoresService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }