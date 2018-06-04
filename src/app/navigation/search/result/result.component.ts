import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../../../model/searchResult';
import { SearchService } from '../../../service/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  results: SearchResult;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.results.subscribe(res=> {
      this.results = res;
      console.log("res:");
      console.log(res);
    });
    
  }

}
