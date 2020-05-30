import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

    const url = 'https://script.google.com/macros/s/AKfycbyl-PyiIiGlHMKSsUtg2DbzWuYYSiJLOP7MiNIg/exec';

    httpOptions.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'true',
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Authorization': '0'
    });

    return this.http.post<any>(url, formData, httpOptions)
      .pipe(
        catchError(this.handleError('sendGMail', []))
      );
  }


}
