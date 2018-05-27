import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : User;
  username: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  numTel: number = null;
  rForm: FormGroup;
  post:any;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required,Validators.email])],
      'password': [null, Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(20)])],
      'nom': [null, Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(20)])],
      'prenom': [null, Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(20)])],
      'adresse': [null, Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(20)])],
      'numTel': [null, Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(20)])]
    })
   }

  ngOnInit() {
    this.user = {
      username:'',
      password:'',
      nom:'',
      prenom:'',
      adresse:'',
      numTel:''
    };
  }

  addPost(post){
    this.user = {
      username: post.username,
      password: post.password,
      nom: post.nom,
      prenom: post.prenom,
      adresse: post.adresse,
      numTel: post.numTel
    };
    this.register();
  }

  register(){
    this.userService.registerUser(this.user)
      .subscribe( data => {
        alert("User created succ");
      });
  }

}
