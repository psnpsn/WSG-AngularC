import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../model/user';
import { UserInfoService, LoginInfoInStorage } from './user-info.service';
import { Router } from '@angular/router';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private userInfoService: UserInfoService, private router: Router) { }

  private url = 'http://localhost:8090/';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'clients');
  }

  public registerUser(user : User){
    return this.http.post<User>(this.url + 'clients', user);
  }

  public authentication(username,password): Observable<any>{

      let loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
      let loginInfoReturn: LoginInfoInStorage = {
        "success" : true,
        "token" : {
          "access_token" : "",
          "refresh_token" : "",
          "expires_in" : ""
        }
      };
      let data = "grant_type=password" + "&username=" + username + "&password=" + password;
      let reqHeader = new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        "Accept": "application/json",
        "Authorization" : 'Basic ' + btoa("worldsoftjwt" + ":" + "WSGjwtTOKEN")
      });

      this.http.post(this.url + 'oauth/token',data,{headers: reqHeader}).subscribe( (jsonResp: any) => {
        if (jsonResp !== undefined || jsonResp !== null){
          loginInfoReturn = {
            "success" : true,
            "token" : {
              "access_token" : jsonResp.access_token,
              "refresh_token" : jsonResp.refresh_token,
              "expires_in" : jsonResp.expires_in
            }
          };
          console.log(loginInfoReturn);
          this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.token));
        }
        else {
          loginInfoReturn = {
            "success" : false
          };
        }
        loginDataSubject.next(loginInfoReturn);

      },
      err => {
        loginInfoReturn = {
          "success": false
        };
      });
      return loginDataSubject;
  }

  logout(navigatetoLogout=true): void {
    // clear token remove user from local storage to log user out
    this.userInfoService.removeUserInfo();
    if(navigatetoLogout){
        this.router.navigate(["logout"]);
    }
  }

}
