import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

//


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  form: FormGroup;
  range: FormGroup;
  public exampleDateToSet = '05/28/2022';
  public minDate: Date;
  public maxDate: Date;
  public isDisabled: boolean = false;
  events: string[] = [];


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {



    this.form = this.fb.group( {
      date: new FormControl(this.stringToDateFormat(this.exampleDateToSet), [Validators.required]),

    } );

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    // Set the minimum to January 1st current year and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 0, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

  }

  datepickerEvent(type: string, e: MatDatepickerInputEvent<Date>): void {
    // console.log('calendar event', type, e.value);
    // this.checkDateFormat(e.value);

    this.events.push(`${type}: ${e.value}`);
  }

  checkDateFormat(date: Date){
    let val = formatDate(date, 'MM/dd/yyyy', 'en');
    console.log('fd', val);
  }

  public getDateErrorMessage(pickerInput: string): void {

    const isValid = moment(pickerInput, 'MM/DD/YYYY', true).isValid();
    console.log('getDateErrorMessage', isValid);

    // return validateDate();
  }

  stringToDateFormat(stringDate: string): Date {
    return new Date(this.exampleDateToSet);
  }

}
