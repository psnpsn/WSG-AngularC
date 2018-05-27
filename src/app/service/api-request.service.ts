import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfoService } from './user-info.service';

/**
   * Add all the request headers with token for every REST call
 */

@Injectable()
export class ApiRequestService {

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService
  ) { }

  getHeaders():HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.userInfoService.getStoredToken();
    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
        headers = headers.append("Authorization", token);
    }
    return headers;
  }

}
