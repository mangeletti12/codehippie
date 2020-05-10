import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, } from 'rxjs';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


@Injectable({ providedIn: 'root' })
export class CostCodesService {
  private handleError: HandleError;
  private swSubject: BehaviorSubject<string> = new BehaviorSubject<string>('sw-array');


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('CostCodesService');
  }


  getCostCodes() {

    const url = 'assets/codes-mock.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getCodes', []))
      );
  }

  //Listener
  get getArray(): Observable<string> {
    console.log('getArray');
    return this.swSubject.asObservable();
  }

  //Change theme method
  changeArray(item) {
    this.swSubject.next(item);
  }

}
