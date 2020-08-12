import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';



@Injectable({ providedIn: 'root' })
export class ContactService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('ContactService');
  }

  sendGMail(formData) {

    console.log('gmail form', formData);

    const url = 'https://script.google.com/macros/s/AKfycbweoPo7m3n3bap1UhCfm2gTHY7Vm6v3C8LHW9HROxm9kgIKQHU/exec';

    httpOptions.headers = new HttpHeaders({

      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',

    });

    return this.http.post<any>(url, formData, httpOptions)
      .pipe(
        catchError(this.handleError('sendGMail', []))
      );
  }


}
