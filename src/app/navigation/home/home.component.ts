import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { UserInfoService } from '../../service/user-info.service';

@Component({
  selector: 'app-guard',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  data: Date = new Date();
  focus;
  focus1;


  constructor(private userInfoService : UserInfoService) {
    
    console.log(userInfoService.getStoredToken());
    console.log(userInfoService.isLoggedIn());
   }

  ngOnInit() {
    console.log(Date.now().toLocaleString());
    const rellaxHeader = new Rellax('.rellax-header');

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
