import { Injectable } from '@angular/core';

export interface TokenInStorage{
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export interface LoginInfoInStorage{
  success:boolean;
  token?:TokenInStorage;
}

@Injectable()
export class UserInfoService {

  public currentUserKey:string="currentUser";
  public storage:Storage = sessionStorage;

  constructor() { }

  storeUserInfo(userInfoString:string) {
    this.storage.setItem(this.currentUserKey, userInfoString);
  }

  removeUserInfo() {
    this.storage.removeItem(this.currentUserKey);
  }

  getUserInfo():TokenInStorage|null {
    try{
        let userInfoString:string = this.storage.getItem(this.currentUserKey);
        if (userInfoString) {
            let userObj:TokenInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
            return userObj;
        }
        else{
            return null;
        }
    }
    catch (e) {
        return null;
    }
  }

  isLoggedIn():boolean{
    return this.storage.getItem(this.currentUserKey)?true:false;
  }

  getUserName():string{
    return null;
  }

  getStoredToken():string|null {
    let userObj:TokenInStorage = this.getUserInfo();
    if (userObj !== null){
        return userObj.access_token;
    }
    return null;
  }

}
