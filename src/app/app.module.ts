import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRootingModule } from './/app-rooting.module';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationModule } from './navigation/navigation.module';
import { FooterComponent } from './layout/footer/footer.component';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TesterComponent } from './tester/tester.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TesterComponent
  ],
  imports: [
    BrowserModule,
    AppRootingModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    NavigationModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
