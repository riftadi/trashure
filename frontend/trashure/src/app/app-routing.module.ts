import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrashureMenuComponent} from "./components/trashure-menu/trashure-menu.component";
import {ExplorationComponent} from "./components/exploration/exploration.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {VerificationComponent} from "./components/verification/verification.component";

const noAuthRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

const secureRoutes: Routes = [
  {
    path: 'game',
    canActivate: [AuthGuardService],
    children: [
      { path: 'menu', component: TrashureMenuComponent },
      { path: 'exploration', component: ExplorationComponent },
      { path: 'verification', component: VerificationComponent }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(noAuthRoutes),
    RouterModule.forRoot(secureRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
