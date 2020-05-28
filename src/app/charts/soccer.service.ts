import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
//


@Injectable({ providedIn: 'root' })
export class SoccerService {
  private handleError: HandleError;

  allTeams: any[] = [];
  // https://www.api-football.com/coverage
  private _baseUrlv2: string = 'https://v2.api-football.com/';
  private _baseUrlv3: string = 'https://v3.football.api-sports.io';
  private _publicKey: string = "ab346fee84b407862eb8e83d1ee2f6a4";
  private _team_id: 40; // Liverpool
  private _league_id: 524; // English Premier League, season 2019-2020


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('SoccerService');
  }

  getAllTeams() {
    // const url = 'assets/superheroes-teams.json';
    // get("https://api-football-v1.p.rapidapi.com/v2/topscorers/{league_id}");

    const url = 'https://api-football-v1.p.rapidapi.com/v2/teams';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getAllTeams', []))
      );
  }

  getLiverpool() {

    httpOptions.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Accept': '*/*',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'V3.football.api-sports',
      'x-rapidapi-key': this._publicKey,
    });

    const url = 'https://v3.football.api-sports.io/teams?id=40';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getLiverpool', []))
      );
  }

}
