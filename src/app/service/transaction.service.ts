import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../model/transaction';

@Injectable()
export class TransactionService {

  constructor(private http: HttpClient, private config: AppConfig) { }

  saveTransaction(transaction : Transaction){
    return this.http.post(this.config.mstransactionUrl + "transaction", transaction);
  }

  getTransactions(username : string):Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.config.mstransactionUrl + "transaction/" + username);
  }

}
