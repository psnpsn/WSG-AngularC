import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './navigation/login/login.component';
import { GuardComponent } from './navigation/guard/guard.component';
import { SignupComponent } from './navigation/signup/signup.component';
import { SearchComponent } from './navigation/search/search.component';
import { TesterComponent } from './tester/tester.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: GuardComponent },
  { path: 'register', component: SignupComponent },
  { path: 'search', component: SearchComponent },
  { path: 'test', component: TesterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRootingModule { }
