import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './search/result/result.component';
import { DefaultComponent } from './search/default/default.component';
import { WhitespacePipe } from '../whitespace.pipe';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [WhitespacePipe],
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    LogoutComponent,
    ResultComponent,
    DefaultComponent,
    WhitespacePipe,
    ProfileComponent,
  ]
})
export class NavigationModule { }
