import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8090/clients';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public registerUser(user : User){
    const body: User = {
      id: null,
      username: user.username,
      password: user.password
    } 
    return this.http.post<User>(this.url, user);
  }

}
