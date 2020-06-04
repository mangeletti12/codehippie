import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class GRMService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('GRMService');
  }


  getContacts(searchOptions) {

    // const page = '?page=' + pageNumber;
    const url = 'assets/contacts.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getContacts', []))
      );
  }

  getAlerts(searchOptions) {

    const url = 'assets/alerts.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getAlerts', []))
      );
  }


}
