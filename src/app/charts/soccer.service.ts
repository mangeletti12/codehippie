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
  private _baseUrl: string = 'https://v3.football.api-sports.io'; // 'https://v2.api-football.com/';
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
      // 'Access-Control-Allow-Origin': 'true',
      // 'Accept': '*/*',
      'Content-Type': 'application/json',
      // 'Authorization': '0'
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this._publicKey,
      // 'method': 'GET'
    });

    const url = 'https://v3.football.api-sports.io/players/topscorers?season=2019&league=61'

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getLiverpool', []))
      );
  }

}
