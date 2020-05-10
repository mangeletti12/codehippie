import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//import { AuthenticationService } from '../security/auth.service';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        //private authenticationService: AuthenticationService,
        private alertService: AlertService,
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {

            console.log("ErrorInterceptor");


            var error = "Ut oh, there be an error mate...";
            
            if (err.error != null) {
                error = err.error.message || err.statusText;
            }
            else {
                error = err.message;
            }
             

            if (err.status === 401) {
                console.log("error 401");
                // auto logout if 401 response returned from api
                //this.authenticationService.logout();
                //location.reload(true);
            }

            if (err.status === 404) {
                error = 'that is a bad address.';
            }
            
            this.alertService.error('Sorry mate, ' + error);
            return throwError(error);
        }))
    }
}