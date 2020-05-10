/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpAuthInterceptor } from './http.interceptor';
//import { CachingInterceptor } from './caching-interceptor';
//import { EnsureHttpsInterceptor } from './ensure-https-interceptor';
//import { LoggingInterceptor } from './logging-interceptor';
import { NoopInterceptor } from './noop.interceptor';
//import { TrimNameInterceptor } from './trim-name-interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { ErrorInterceptor } from './error.interceptor';

// Angular applies interceptors in the order that you provide them.
// If you provide interceptors A, then B, then C, requests will flow in A -> B -> C
// and responses will flow out C -> B -> A.

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
];
