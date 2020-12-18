import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
//
import { Md5 } from 'ts-md5/dist/md5';


@Injectable({ providedIn: 'root' })
export class SuperheroesService {
  private handleError: HandleError;
  heroesToInsert: any[] = [];
  teamsWithHeroes: any[] = [];
  allTeams: any[] = [];
  //
  private _marvelCharacterUrl : string = "https://gateway.marvel.com:443/v1/public/characters";
  private _publicKey : string = "9285e370921040c25d101324e5943c31";
  private _privateKey : string = "e9e65111fa22dc3456e88a9ed422544a74113487";

  private getHash(timeStamp : string) : string {
      let hashGenerator : Md5 = new Md5();
      hashGenerator.appendStr(timeStamp);
      hashGenerator.appendStr(this._privateKey);
      hashGenerator.appendStr(this._publicKey);
      let hash : string = hashGenerator.end().toString();
      return hash;
  }
  private getTimeStamp() : string {
      return new Date().valueOf().toString();
  }

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('SuperheroesService');
  }

  // Set hero(s) to delete
  // ... since we haove no DB
  setHeroToInsert(hero: any) {
    this.heroesToInsert.push(hero);
    console.log('heroesToInsert', this.heroesToInsert);
  }
  //
  getHeroToInsert() {
    return this.heroesToInsert;
  }

  // Set hero(s) to team
  // ... since we haove no DB
  setHeroToTeam(team: any) {

    for(let i = 0; i < team.length; i++) {
      this.teamsWithHeroes.push(team[i]);
    }
    // console.log('--> setHeroToTeam', this.teamsWithHeroes);
  }
  getHeroToTeam() {
    return this.teamsWithHeroes;
  }

  // Set all teams
  // ... since we have no DB
  setAllTeams(teams: any) {
    this.allTeams = teams;
  }
  //
  getAllTeams() {
    return this.allTeams;
  }


  getAllHeroes(searchCriteria: any) {
    // reset
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    httpOptions.params = null;

    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const url = this._marvelCharacterUrl + "?&ts=" + timeStamp + "&apikey=" + this._publicKey + "&hash=" + hash;
    //
    // const options = new HttpParams().set('limit', searchCriteria.limit);
    let httpParams = new HttpParams();

    for (var key in searchCriteria) {
      if (key !== 'page') {
        var value = searchCriteria[key];
        httpParams = httpParams.append(key, value);
      }
    }
    httpOptions.params = httpParams;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getAllHeroes', []))
      );
  }

  getHero(id) {
    // reset
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    httpOptions.params = null;

    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const url = this._marvelCharacterUrl + "/" + id + "?&ts=" + timeStamp + "&apikey=" + this._publicKey + "&hash=" + hash;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getHero', []))
      );
  }

  getDetails(resourceURI) {
    // reset
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    httpOptions.params = null;

    // http://gateway.marvel.com/v1/public/characters/1010699
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const url = resourceURI + "?&ts=" + timeStamp + "&apikey=" + this._publicKey + "&hash=" + hash;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getDetails', []))
      );
  }

  // TEAMS
  ////////

  getTeams() {
    const url = 'assets/superheroes-teams.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getTeams', []))
      );
  }

}
