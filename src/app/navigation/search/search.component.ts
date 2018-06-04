import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, Validators , FormControl } from '@angular/forms';
import { Search } from '../../model/search';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SearchService } from '../../service/search.service';

import { Airport } from '../../model/airport';
import { Town } from '../../model/town';
import { UserInfoService } from '../../service/user-info.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  airportsData: Airport[] = [];
  airports:any[] = [];
  townsData: Town[] = [];
  towns: any[] = [];
  numbers = [0,1,2,3,4,5,6,7,8,9];
  rForm: FormGroup;
  from: string;
  to: string;
  search: Search = {
    from: null,
    to: null,
    searchedDate: null,
    searchedTime: null,
    adult:null,
    children:null,
    infant:null,
    dateQuery: null,
    clientUsername : ""
  };

  Airportsrch = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.airports.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  Townsrch = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.towns.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  post:any;
  constructor(private fb: FormBuilder, private searchService: SearchService, private userInfo: UserInfoService) {
    this.rForm = fb.group({
      'from': [null, Validators.compose([Validators.required])],
      'to': [null, Validators.compose([Validators.required])],
      //to: new FormControl({value : 'to', disabled: !this.rForm.controls['from'].valid} , Validators.required),
      'whenDate': [null, Validators.compose([Validators.required])],
      'whenTime': [null, Validators.compose([Validators.required])],
      'adults': [null, Validators.compose([Validators.required])],
      'children': [null, Validators.compose([Validators.required])],
      'infants': [null, Validators.compose([Validators.required])]
    });

    this.search.clientUsername = userInfo.getUsername();
  }

  ngOnInit() {
    
    this.airportsData = this.getAirports();
    
    this.townsData = this.getTowns();
    

  }

  getAirports(): any {
    return this.searchService.getAirports().subscribe(
      data => {
        this.airportsData = data;
        this.airports = data.map(function(item){
          return item["nom"];
        });
        console.log(this.airports);
        this.Airportsrch = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => term.length < 2 ? []
            : this.airports.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 20)),
        );
      }
    );
  }

  getTowns():any{
    return this.searchService.getTowns().subscribe(
      data => {
        this.townsData = data;
        this.towns = data.map(function(item){
          return [item.nom,item.city,item.country].join(", ");
        });
        console.log(this.towns);
        this.Airportsrch = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => term.length < 2 ? []
            : this.towns.filter(function (str) { return str.includes(this.search.from.substring(this.search.form.indexOf(","))); })
                .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 20))
        );
      }
    );
  }


  OnSubmit(post){
    this.search.dateQuery = new Date(Date.now());
    var from = this.from;
    this.search.from = this.airportsData.find(function (obj) { return obj.nom === from; });
    var to = this.to;
    this.search.to = this.townsData.find(function (obj) { return [obj.nom,obj.city,obj.country].join(", ") === to; });
    this.searchService.saveSearch(this.search)
      .subscribe( data => {
        console.log(data);
        this.shareResults(data);
      });
    console.log(this.search);
  }

  shareResults(data){
    this.searchService.sendResult(data);
  }

}
