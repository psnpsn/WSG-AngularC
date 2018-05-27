import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Search } from '../../model/search';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  location: any;
  numbers = [0,1,2,3,4,5,6,7,8,9];
  rForm: FormGroup;
  search: Search = {
    from: "",
    to: "",
    whenDate: null,
    whenTime: null,
    adults:1,
    children:0,
    infants:0,
    searchDate: null
  };

  srch = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.location.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  post:any;
  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'from': [null, Validators.compose([Validators.required])],
      'to': [null, Validators.compose([Validators.required])],
      'whenDate': [null, Validators.compose([Validators.required])],
      'whenTime': [null, Validators.compose([Validators.required])],
      'adults': [null, Validators.compose([Validators.required])],
      'children': [null, Validators.compose([Validators.required])],
      'infants': [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  }

  OnSubmit(post){
    this.search.searchDate = new Date(Date.now());
    console.log(this.search);
  }

}
