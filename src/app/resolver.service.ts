import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// https://codeburst.io/understanding-resolvers-in-angular-736e9db71267
// https://medium.com/@aayushwadhwa31/angular-6-loading-data-with-resolver-250bb3231f03

@Injectable({ providedIn: 'root' })
export class ResolverService implements Resolve<any> {
  node: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('Resolver route', route);
    console.log('Resolver state', state.url);

    // return new Observable((observer) => {
    //   // stop
    //   // observer.complete();

    //   setTimeout(() => {
    //     console.log('setTimeout');
    //     // observer.next();
    //     this.router.navigate([state.url]);
    //   }, 5);

    // });
    // return this.http.get('https://jsonplaceholder.typicode.com/posts');

  }


}
