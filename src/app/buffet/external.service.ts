import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

//URL
const serviceUrl = 'https://exportbeta.rootssoftware.com/api/';

@Injectable()
export class ExternalService {
  //
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    //
    this.handleError = httpErrorHandler.createHandleError('ExternalService');
  }


  /* for testing only */

  error401() {
      console.log('error401');

      let url = 'https://exportbeta.rootssoftware.com/api/company/sow?pageSize=100&startDate=1.1.1973&endDate=12.31.3000';

      return this.http.get<any>(url, httpOptions)
        .pipe(
          catchError(this.handleError('Error401', []))
        );
  }

  error404() {
      console.log('error404');

      return this.http.get('not/a/real/url')
      .pipe(
          catchError(this.handleError('Error404', []))
      );
  }

  error405() {
    console.log('error405');

    let url = 'https://exportbeta.rootssoftware.com/api/company/sow?pageSize=100&startDate=1.1.1973&endDate=12.31.3000';

    return this.http.post<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('Error401', []))
      );
  }

  longReguest() {

    let url = 'assets/main-nav.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getNav', []))
      );
  }


  getBearerToken(dto: any) {

    httpOptions.headers = new HttpHeaders({
        "Content-Type": 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": 'true',
        "Accept": '*/*'
      })

    //
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', 'caustin@rootssoftware.com');
    urlSearchParams.set('password', 'Testing123');
    let body = urlSearchParams.toString();

    return this.http.post<any>('https://exportbeta.rootssoftware.com/token', body, httpOptions)
      .pipe(
        catchError(this.handleError('getBearerToken', []))
      );

  }

  register(dto: any) {

    let url = 'Account/Register';

    return this.http.post<any>(serviceUrl + url, dto, httpOptions)
      .pipe(
        catchError(this.handleError('register', []))
      );

  }


  listCompany(dto: any) {
    var queryString = Object.keys(dto).map(key => key + '=' + dto[key]).join('&');
    console.log(queryString);
    var qString = '?pageNumber=1&pageSize=100&startDate=1.1.2019&endDate=12.31.2019';

    let url = 'Company' + qString;

    return this.http.get<any>(serviceUrl + url, httpOptions)
      .pipe(
        catchError(this.handleError('listCompany', []))
      );

  }


}
