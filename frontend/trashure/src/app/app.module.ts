import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TrashureMenuComponent } from './trashure-menu/trashure-menu.component';
import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { ExplorationComponent } from './exploration/exploration.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderboardComponent,
    TrashureMenuComponent,
    ExplorationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
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
