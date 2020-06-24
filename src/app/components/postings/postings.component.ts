import { Component, OnInit } from '@angular/core';
import { POSTINGS } from '../../shared/postings';
import { Posting } from 'src/app/shared/posting';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss']
})
export class PostingsComponent implements OnInit {

  postings:Posting[];
  constructor() { 
    this.postings = POSTINGS;
  }

  ngOnInit() {
  }

  getPrice(post:Posting){
    return post.posting_prices[0].price.amount;
  }

  getExpenses(post:Posting){
    return post.posting_prices[0].expenses.amount;
  }

  hasExpenses(post:Posting){
    if(post.posting_prices[0].expenses){
      return true;
    }
    return false;
  }
}
