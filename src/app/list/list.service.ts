import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
//import { BehaviorSubject, Observable, } from 'rxjs';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class ListService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('ListService');
  }

  //Get List
  getList(pageNumber) {

    let url = "https://swapi.dev/api/people/";
    let page = "?page=" + pageNumber;

    return this.http.get<any>(url+page, httpOptions)
      .pipe(
        catchError(this.handleError('getList', []))
      );
  }


}
