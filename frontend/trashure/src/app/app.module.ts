import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';

import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';

import { AgmCoreModule } from '@agm/core';

import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {TrashureMenuComponent} from "./components/trashure-menu/trashure-menu.component";
import {ExplorationComponent} from "./components/exploration/exploration.component";
import {StreetviewComponent} from "./components/streetview/streetview.component";

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    TrashureMenuComponent,
    ExplorationComponent,
    StreetviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDKv-vShjESv1Hwkn3FCqPUj-Ff7BW17ic'
    }),
    MatToolbarModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
