import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './navigation/login/login.component';
import { SignupComponent } from './navigation/signup/signup.component';
import { SearchComponent } from './navigation/search/search.component';
import { TesterComponent } from './tester/tester.component';
import { AuthGuard } from './service/auth-guard.guard';
import { HomeComponent } from './navigation/home/home.component';
import { LogoutComponent } from './navigation/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: SignupComponent },
  { path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
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
