import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

// With interception, you declare interceptors that inspect and transform HTTP requests
// from your application to the server. The same interceptors may also inspect and transform
// the server's responses on their way back to the application.
// Multiple interceptors form a forward - and - backward chain of request / response handlers.

// https://angular.io/guide/http#intercepting-requests-and-responses
// https://stackblitz.com/angular/ygxmamrqrrk?file=src%2Fapp%2Fhttp-interceptors%2Fupload-interceptor.ts

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private status: HTTPStatus) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const started = Date.now();
    let ok: string;

    return next.handle(req)
    .pipe(
      tap(event => {
        // Succeeds when there is a response; ignore other events
        ok = event instanceof HttpResponse ? 'succeeded' : '',
        this.status.setHttpStatus(true);
        return event;
      }),
      catchError(error => {
        //
        // Operation failed; error is an HttpErrorResponse
        ok = 'failed'
        return throwError(error);
      }),
      finalize(() => {

        const elapsed = Date.now() - started;

        const msg = `${req.method} "${req.urlWithParams}"
           ${ok} in ${elapsed} ms.`;

        // console.log(msg);

        this.status.setHttpStatus(false);
      })
    )
  }
}
