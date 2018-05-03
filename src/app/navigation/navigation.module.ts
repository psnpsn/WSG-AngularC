import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GuardComponent } from './guard/guard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    GuardComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent
  ]
})
export class NavigationModule { }
