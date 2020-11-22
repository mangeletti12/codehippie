import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


@Injectable({ providedIn: 'root' })
export class FootyService {
  private handleError: HandleError;

  allTeams: any[] = [];
  // https://www.football-data.org/documentation/quickstart/
  // https://www.football-data.org/documentation/api
  private _footyUrl : string = "https://api.football-data.org";
  private _publicKey : string = "1fb7815b75d14fedbf08607d2cb29f4a";

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('FootyService');
  }


  getEplTable() {
    // reset
    httpOptions.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'X-Auth-Token': this._publicKey
    });
    httpOptions.params = null; 

    const base = '/v2/competitions';
    // premeir league = 2072
    const url = `${this._footyUrl}${base}/PL/standings`;

    return this.http.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError('getAllTeams', []))
    );

  }

  getLfcUpcomingMatches() {
    // reset
    httpOptions.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'X-Auth-Token': this._publicKey
    });
    httpOptions.params = null;

    const url = 'https://api.football-data.org/v2/teams/64/matches?status=SCHEDULED';

    return this.http.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError('getLfcUpcomingMatches', []))
    );

  }


  getTeam(teamId: number) {
    // console.log('teamId', teamId);
    // reset
    httpOptions.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'X-Auth-Token': this._publicKey
    });
    httpOptions.params = null;

    const base = '/v2/teams';
    // LFC = 64
    const url = `${this._footyUrl}${base}/${teamId}`;

    return this.http.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError('getTeam', []))
    );

  }


}
