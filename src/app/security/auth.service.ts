import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
//import { JwtHelperService } from '@auth0/angular-jwt';

//import { AppUserClaim } from './app-user-claim';
//import { Claims } from '../constants/claims';

//https://codinglatte.com/amp/posts/angular/refreshing-authorization-tokens-angular-6/
//http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class AuthenticationService {
  private handleError: HandleError;
  private currentUserSubject: BehaviorSubject<AppUserAuth>;
  public currentUser: Observable<AppUserAuth>;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('SecurityService');
    this.currentUserSubject = new BehaviorSubject<AppUserAuth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): AppUserAuth {
    return this.currentUserSubject.value;
  }

  loginAPI(entity: AppUser) {

    const API_URL = "https://exportbeta.rootssoftware.com/token";

    httpOptions.headers = new HttpHeaders({
      "Content-Type": 'application/x-www-form-urlencoded',
      "Access-Control-Allow-Origin": 'true',
      "Accept": '*/*'
    });

    //
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', entity.username);
    urlSearchParams.set('password', entity.password);
    urlSearchParams.set('client_id', 'RootsWebClient');
    urlSearchParams.set('client_secret', '');

    let body = urlSearchParams.toString();

    return this.http.post<any>(API_URL, body, httpOptions)
        .pipe(map(
          data => {
            console.log("--server--");
            console.log(data);
            //convert claims string to array
            var claimsArray = JSON.parse(data['claims']);
            data['claims'] = claimsArray;

            // login successful if there's a jwt token in the response
            if (data && data.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.currentUserSubject.next(data);
            }

            return data;
        }));
  }

  //Logout
  logout() {
    console.log('logout');
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  register(dto: any) {

    let url = 'Account/Register';

    // return this.http.post<any>(serviceUrl + url, dto, httpOptions)
    //   .pipe(
    //     catchError(this.handleError('register', []))
    //   );

  }

  /*
  //Refresh Token
  refreshToken(): Observable<string> {
    const url = 'url to refresh token here';

    // append refresh token if you have one
    const refreshToken = localStorage.getItem('refreshToken');
    const expiredToken = localStorage.getItem('token');

    return this.http
      .get(url, {
        headers: new HttpHeaders()
          .set('refreshToken', refreshToken)
          .set('token', expiredToken),
        observe: 'response'
      })
      .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');

          // store the new tokens
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('token', token);

          return token;
        })
      );
  }
  */

  /*
  //Get Token
  getToken(): Observable<string> {
    const token = localStorage.getItem('token');
    //const isTokenExpired = this.decoder.isTokenExpired(token);

    //if (!isTokenExpired) {
      //return of(token);
    //}

    return this.refreshToken();
  }
  */

  //Login for MOCK DATA
  login(entity: AppUser) {

    let url = 'assets/login-mock.json';

    return this.http.get<any>(url, httpOptions)
        .pipe(map(
          data => {
            console.log("--mock--");
            var mockUser = data.Users[0];
            console.log(mockUser);
            //convert claims string to array
            var claimsArray = JSON.parse(mockUser['claims']);
            mockUser['claims'] = claimsArray;

            // login successful if there's a jwt token in the response
            if (mockUser && mockUser['refresh_token']) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(mockUser));
                this.currentUserSubject.next(mockUser);
            }

            return mockUser;
        }));

  }



  // This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1', 'claimType2:value', 'claimType3']"
  hasClaim(claimType: any, claimValue?: any) {
    let ret: boolean = false;

    //console.log(claimType + ' --- ' + claimValue);

    //String or Array?
    //STRING
    if (typeof claimType === "string") {

      var claimTypeX = claimType;
      var claimValueX = claimValue;
      //Check for , delimiter. If there then a claimValue is present
      var hasClaimValue = claimType.indexOf(',');

      if (hasClaimValue > 0) {
        var x = claimType.split(',');
        claimTypeX = x[0];
        claimValueX = x[1];
      }

      ret = this.isClaimValid(claimTypeX, claimValueX);
      //console.log('hasClaim: ' + ret);
    }
    else {
      //ARRAY
      //console.log('array');
      let claims: string[] = claimType;
      //console.log(claims);

      if (claims) {
        for (let index = 0; index < claims.length; index++) {

          var claimTypeX = claims[index];
          var claimValueX = claimValue;
          //Check for , delimiter. If there then a claimValue is present
          var hasClaimValue = claims[index].indexOf(',');

          if (hasClaimValue > 0) {
            var x = claims[index].split(',');
            claimTypeX = x[0];
            claimValueX = x[1];
          }

          ret = this.isClaimValid(claimTypeX, claimValueX);
          //console.log('hasClaim: ' + ret);

          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  //Check claim id valid
  private isClaimValid(claimType: string, claimValue?: string) {
    //Key
    // var rootsRights =
    // {
    //     None: 0,
    //     Create: 1,
    //     Read: 2,
    //     Update: 4,
    //     Delete: 8,
    //     Execute: 16,
    //     All: 32
    // }

    //console.log(claimType + " --*-- " + claimValue);

    // var claimDefault = 0;
    // if(claimValue != undefined) {

    //   switch(claimValue.toLowerCase()) {
    //     case 'none':
    //       claimDefault = 0;
    //       break;
    //     case 'create':
    //       claimDefault = 1;
    //       break;
    //     case 'read':
    //       claimDefault = 2;
    //       break;
    //     case 'update':
    //       claimDefault = 4;
    //       break;
    //     case 'delete':
    //       claimDefault = 8;
    //       break;
    //     case 'execute':
    //       claimDefault = 16;
    //       break;
    //     case 'all':
    //       claimDefault = 32;
    //       break;
    //     case undefined:
    //       claimDefault = 0;
    //       break;
    //     case "":
    //       claimDefault = 0;
    //       break;
    //     default:
    //       claimDefault = 0;
    //   }
    // }
    // console.log(claimDefault);

    let auth: AppUserAuth = null;
    // Retrieve security object
    auth = this.currentUserValue;

    if (auth) {
      var foundClaim = auth.claims.find(o => o.ClaimType === claimType);
      //console.log(foundClaim);
      //No claim was found so they're out
      if (foundClaim == null) {
          return false;
      }

      //Have the claim and don't need a claimValue so they are good
      if(foundClaim && claimValue === undefined) {
        return true;
      }

      if (foundClaim && foundClaim.ClaimValue.toLowerCase() === claimValue.toLowerCase()) {
        return true;
      }
      else {
        return false;
      }

      // var numClaim = Number(foundClaim.ClaimValue);

      // if (isNaN(numClaim)){
      //   numClaim = 0;
      // }

      // //bitwise
      // if ((numClaim & claimDefault) == claimDefault) {
      //   return true;
      // }
      // else {
      //   return false;
      // }

    }
  }



}
