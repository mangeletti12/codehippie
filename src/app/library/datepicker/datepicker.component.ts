import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter, //DateFnsAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
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
      date: new FormControl(this.stringToDateFormat(this.exampleDateToSet), Validators.required),


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

  // Called from HTML template in mat-error
  public getDateErrorMessage(pickerInput: string): string {

    const isValid = moment(pickerInput, 'MM/DD/YYYY', true).isValid();
    // console.log('getDateErrorMessage', pickerInput, isValid);
    if (!isValid) {
      return 'You date is not in a proper format';
    }

    return null;
  }

  stringToDateFormat(stringDate: string): Date {
    return new Date(this.exampleDateToSet);
  }

}
