import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
//import { BehaviorSubject, Observable, } from 'rxjs';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class IScrollService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('IScrollService');
  }


  getSWAPI(pageNumber) {

    //let url = "https://swapi.dev/api/people/";
    const page = '?page=' + pageNumber;
    const url = 'assets/sw-mock.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getList', []))
      );
  }

  getChangeOrders(pageNumber) {
    const url = 'assets/cor-mock.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getChangeOrders', []))
      );
  }


}
