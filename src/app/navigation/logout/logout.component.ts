import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private userInfoService: UserInfoService) { 
    this.userInfoService.removeUserInfo();
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }

}
