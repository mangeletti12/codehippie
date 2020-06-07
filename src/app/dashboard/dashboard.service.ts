import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {

    this.handleError = httpErrorHandler.createHandleError('DashboardService');
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


  getNasaRssFeed() {
    const url = 'https://spaceflightnewsapi.net/api/v1/articles';

    httpOptions.headers = new HttpHeaders({
      // 'Access-Control-Allow-Origin': 'true',
      // 'Accept': '*/*',
      'Content-Type': 'application/json, application/xml',
      'Authorization': 'Bearer 12'
    });

    return this.http.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError('getNasaRssFeed', []))
    );

  }


}
