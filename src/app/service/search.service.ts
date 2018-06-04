import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../app-config';
import { Search } from '../model/search';
import { Airport } from '../model/airport';
import { Town } from '../model/town';
import { SearchResult } from '../model/searchResult';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {

  public results = new BehaviorSubject<any>([]);
  cast= this.results.asObservable();

  constructor(private http: HttpClient, private config: AppConfig) { }

  public getAirports():Observable<Airport[]>{
    return this.http.get<Airport[]>(this.config.mssearchUrl + "airports");
  }

  getTowns():Observable<Town[]>{
    return this.http.get<Town[]>(this.config.mssearchUrl + "towns");
  }

  saveSearch(search : Search):Observable<SearchResult>{
    return this.http.post<SearchResult>(this.config.mssearchUrl + "searchq", search);
  }

  sendResult(data) {
    this.results.next(data);
  }

}
