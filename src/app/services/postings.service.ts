import { Injectable } from '@angular/core';
import { Posting } from '../shared/posting';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Filters } from '../shared/filters';
import { FormGroup } from '@angular/forms';

const urlBase:string = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root'
})
export class PostingsService {

  private sendMessageSubject = new Subject<Posting[]>();
  postings = this.sendMessageSubject.asObservable();

  
  //postings:Observable<Posting[]>;

  constructor(private http:HttpClient) { 
    
  }


  setToFavorite(post:Posting):Observable<Posting> {
    const httpOptiones = { 
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.put<Posting>(urlBase + 'postings/' + post.id, post, httpOptiones);
  }

  getPostings(filters?:FormGroup) {
    let filtersString:string='?';
    //operation_type.operation_type_id
    //posting_location.address
    if(filters){
      Object.keys(filters.controls).forEach(key => {
        if(filters.controls[key].value){
          if(key === 'operation_type_id' && filters.controls[key].value !== '4'){
            filtersString += 'operation_type.operation_type_id=' + filters.controls[key].value + '&';
          }else if(key === 'address'){
            filtersString += 'posting_location.address=' + filters.controls[key].value + '&';
          }
        }
      });
    }

    this.http.get<Posting[]>(urlBase + 'postings' + filtersString).toPromise().then(postings=>{
      this.sendMessageSubject.next(postings);
    });
  }
}
