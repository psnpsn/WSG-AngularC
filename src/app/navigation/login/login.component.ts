import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errMsg : string;
  data: Date = new Date();
  rForm: FormGroup;
  post:any;

  constructor(private userService : UserService, private router : Router, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required,Validators.email])],
      'password': [null, Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(20)])]
    })
  }

  ngOnInit() {
  }

  OnSubmit(post) {
    this.loginUser(post.username,post.password);
  }



  loginUser(username,password){
    console.log(username + "/" + password)
    this.userService.authentication(username,password).subscribe( (data : any) => {
      if (data.token === undefined || data.token.access_token === undefined || data.token.access_token === "INVALID" ){
        this.errMsg = 'Username or password is incorrect';
        return;
      }
      this.errMsg= "Connected";
      this.router.navigate(["/home"]);
      },
      errResponse => {
        switch(errResponse.status){
          case 401:
            this.errMsg = 'Username or password is incorrect';
            break;
          case 404:
            this.errMsg = 'Service not found';
          case 408:
            this.errMsg = 'Request Timedout';
          case 500:
            this.errMsg = 'Internal Server Error';
          default:
            this.errMsg = 'Server Error';
        } 
      }
    );

  }
}
