import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {

  dataSource: User[] = [] ;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      data => {
        this.dataSource = data;
        console.log(data);
      }
    );
  }

}
