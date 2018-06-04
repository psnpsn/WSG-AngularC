import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../../../model/searchResult';
import { SearchService } from '../../../service/search.service';
import { TransactionService } from '../../../service/transaction.service';
import { UserInfoService } from '../../../service/user-info.service';
import { Transaction } from '../../../model/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  transaction: Transaction = {
    dateTransaction: null,
    codeAirport: "",
    idTown: null,
    adult: null,
    enfant: null,
    bebe: null,
    prix: null,
    username: "",
    idCategorie: null
  } ;
  results: SearchResult;
  username: string;

  constructor(private searchService: SearchService, private transactionService: TransactionService,
     private userInfo: UserInfoService, private router: Router) { 
    this.transaction.username = userInfo.getUsername();
  }

  ngOnInit() {
    this.getResults();
  }

  getResults(){
    this.searchService.results.subscribe( res=> {
      this.results = res;
      console.log("res:");
      console.log(res);
    });
  }

  saveTransaction(){
    this.transactionService.saveTransaction(this.transaction).subscribe( res=> {
      this.router.navigate(["home"]);
    });;
  }

  bookNow(res){
    console.log("booknow");
    console.log(res);
    this.transaction = {
      dateTransaction: new Date(Date.now()),
      codeAirport: res.searchq.from.code,
      idTown: res.searchq.to.id,
      adult: res.searchq.adult,
      enfant: res.searchq.children,
      bebe: res.searchq.infant,
      prix: res.prix,
      username: this.username,
      idCategorie: res.categorie.idCategorie
    }
    this.saveTransaction();
  }

}
