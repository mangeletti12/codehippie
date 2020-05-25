import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private handleError: HandleError;
  heroesToInsert: any[] = [];
  teamsWithHeroes: any[] = [];
  allTeams: any[] = [];
  //
  private _spotifyBaseUrl : string = "https://api.spotify.com";
  // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
  // https://developer.spotify.com/documentation/general/guides/authorization-guide/
  // https://developer.spotify.com/community/showcase/web-apps/
  // GET https://api.spotify.com/v1/playlists/{playlist_id}
  private my_client_id: string = "7099083a151d4823afec0b0255e8c3cc";
  // private redirect_uri: string = 'http://codehippie.com/spotify';
  private redirect_uri: string = 'http://localhost:4200/music';
  // private _privateKey : string = "e9e65111fa22dc3456e88a9ed422544a74113487";

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
    this.handleError = httpErrorHandler.createHandleError('MusicService');
  }

  loginSpotify() {
    // app.get('/login', function(req, res) {

    //   var scopes = 'user-read-private user-read-email';

    //   res.redirect('https://accounts.spotify.com/authorize' +
    //     '?response_type=code' +
    //     '&client_id=' + my_client_id +
    //     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    //     '&redirect_uri=' + encodeURIComponent(redirect_uri));
    //   });

    const scopes = 'user-read-private user-read-email';

    const url = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + this.my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(this.redirect_uri);

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('loginSpotify', []))
      );

  }

  getPlaylist() {

    const url = "https://api.spotify.com/v1/playlists/59ZbFPES4DQwEjBpWHzrtC";

    httpOptions.headers = new HttpHeaders({
      // 'Access-Control-Allow-Origin': 'true',
      // 'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.my_client_id
    });

   return this.http.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError('getPlaylist', []))
    );

  }


}
