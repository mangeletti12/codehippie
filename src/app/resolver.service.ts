import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import { GlobalService } from './globals/global.service';

// https://codeburst.io/understanding-resolvers-in-angular-736e9db71267
// https://medium.com/@aayushwadhwa31/angular-6-loading-data-with-resolver-250bb3231f03

@Injectable({ providedIn: 'root' })
export class ResolverService implements Resolve<any> {
  isDoorOpen = false;

  constructor(
    // private _globalService: GlobalService,
  ) {

    // // Listen for Doors Open/Close
    // this._globalService.doorsTransition.subscribe(
    //   data => {
    //     if (data === 'closeDoors') {
    //       this.isDoorOpen = true;
    //     }
    //     if (data === 'openDoors') {
    //       this.isDoorOpen = false;
    //     }
    // });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // console.log('Resolver route', route);
    // console.log('Resolver state', state.url);

    // console.log('Doors', !this.isDoorOpen);
    // if (!this.isDoorOpen) {
    //   return new Observable((observer) => {
    //     // stop route
    //     observer.complete();
    //     this._globalService.toggleDoors('closeDoors');

    //   });
    // }

    // move scrollbar to top
    window.scrollTo(0, 0);

  }

}
