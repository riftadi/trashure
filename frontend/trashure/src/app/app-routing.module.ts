import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExplorationComponent} from "./exploration/exploration.component";
import {TrashureMenuComponent} from "./trashure-menu/trashure-menu.component";

const routes: Routes = [
  { path: '', component: TrashureMenuComponent },
  { path: 'exploration', component: ExplorationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
