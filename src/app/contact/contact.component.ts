import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form = this.formBuilder.group({
    name: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email])
  });
  
  constructor(
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<ContactComponent>) {

  }

  ngOnInit(): void {
  }

  submit(): void {


    this.dialogRef.close();
  }


}
