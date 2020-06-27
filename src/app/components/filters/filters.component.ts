import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostingsService } from 'src/app/services/postings.service';
import { OperationType } from 'src/app/shared/operationType';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  operationsTypes:OperationType[] = [
    {operation_type_id:1, operation_type_name:'Alquilar'}, 
    {operation_type_id:2, operation_type_name:'Comprar'}, 
    {operation_type_id:3, operation_type_name:'Temporal'},
    {operation_type_id:4, operation_type_name:'Todos'}
  ];

  operationSelected:string;

  form = new FormGroup({
    address: new FormControl(),
    operation_type_id: new FormControl('4')
  });

  constructor(private postingService:PostingsService) { }

  ngOnInit() {
  }

  submit(){

  }

  getByAddress(){
    this.postingService.getPostings(this.form);
  }

}
