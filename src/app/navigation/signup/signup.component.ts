import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
    form.reset();
    this.user = {
      id: null,
      username: '',
      password: ''
    }
  }

  register(){
    this.userService.registerUser(this.user)
      .subscribe( data => {
        alert("User created succ");
      });
  }

}
