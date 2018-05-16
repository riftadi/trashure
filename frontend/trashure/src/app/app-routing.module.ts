import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrashureMenuComponent} from "./components/trashure-menu/trashure-menu.component";
import {ExplorationComponent} from "./components/exploration/exploration.component";

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
