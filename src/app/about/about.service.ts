import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
//
@Injectable({ providedIn: 'root' })
export class AboutService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('AboutService');
  }

  // Skills
  ////////
  getSkills() {
    const url = 'assets/skills.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getSkills', []))
      );
  }

}
