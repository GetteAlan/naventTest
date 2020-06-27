import { Component, OnInit } from '@angular/core';

import { Posting } from 'src/app/shared/posting';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { PostingsService } from 'src/app/services/postings.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from 'src/app/contact/contact.component';


@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.scss']
})
export class PostingsComponent implements OnInit {

  postings:Posting[];

  constructor(private postingService:PostingsService, public dialog:MatDialog) { 

  }

  ngOnInit() {
    this.postingService.postings.subscribe((postings) => {
      this.postings = postings;
    });

    this.postingService.getPostings();
  }

  formatCurrency(number):string {
    var formatted = new Intl.NumberFormat("es-CO", {
      style: 'currency',
      currency: "COP",
      minimumFractionDigits: 2
    }).format(number);
    return formatted;
  }

  hasExpenses(post:Posting){
    if(post.posting_prices[0].expenses){
      return true;
    }
    return false;
  }

  getSincePublishDate(publishDate:string):number{
    let dateParts:string[] = publishDate.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    let dateTarget:Date = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]); 
   
    let currentDate:Date = new Date();
    let resta:number = currentDate.getTime() - dateTarget.getTime();
    return Math.round(resta/ (1000*60*60*24));
  }

  getStateColor(post:Posting):string{
    if(post && post.publication_plan){
      if(post.publication_plan === 'SUPERHIGHLIGHTED'){
        return 'blueviolet';
      }
      else if(post.publication_plan === 'HIGHLIGHTED'){
        return 'green';
      }
    }
    return '';
  }

  getStatusDetail(post:Posting):string{
    if(post && post.publication_plan){
      if(post.publication_plan === 'SUPERHIGHLIGHTED'){
        return 'Super destacado';
      }
      else if(post.publication_plan === 'HIGHLIGHTED'){
        return 'Destacado';
      }
    }
    return 'Simple';
  }

  getIconFavorite(post:Posting):string{
    if(post && post.favorite){
      return 'favorite';
    }
    return 'favorite_border';
  }

  getStyleFavorite(post:Posting):string{
    if(post && post.favorite){
      return 'red';
    }
    return '';
  }

  setToFavorite(post:Posting){
    post.favorite = !post.favorite;
    this.postingService.setToFavorite(post).subscribe(post=>{

    },error=>{
      console.log(error);
    });
  }

  openLoginForm(){
    this.dialog.open(ContactComponent, {width:"400px"});
  }
}
