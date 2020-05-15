import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../security/auth.service';

// In the login() method of the SecurityService class to store the bearer token into local storage.
// https://www.intertech.com/Blog/angular-4-tutorial-handling-refresh-token-with-new-httpinterceptor/

// https://itnext.io/angular-tutorial-implement-refresh-token-with-httpinterceptor-bfa27b966f57
// HTTP Interceptors are used for adding custom logic for logging, modifying response, error handling,
// but one common case is to automatically attach authentication informations to request
// and to refresh token in order to maintain user session active.

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    // private injector: Injector,
    // private router: Router
    )
  {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    //console.log("HttpAuthInterceptor");
    // add authorization header with jwt token if available
    let currentUser = this.authService.currentUserValue;
    var isMarvel = req.url.includes("marvel");
    // console.log(isMarvel);

    if (!isMarvel) {

      if (currentUser && currentUser.access_token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.access_token}`
          }
        });
      }

    }

    return next.handle(req);
  }


}
