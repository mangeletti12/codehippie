import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, } from 'rxjs';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


@Injectable({ providedIn: 'root' })
export class PickerService {
  private handleError: HandleError;
  private swSubject: BehaviorSubject<string> = new BehaviorSubject<string>('sw-array');


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('PickerService');
  }


  getSWAPI(pageNumber) {

    //let url = "https://swapi.dev/api/people/";
    const page = '?page=' + pageNumber;
    const url = 'assets/sw-mock.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getSWAPI', []))
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
