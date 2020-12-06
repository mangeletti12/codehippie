import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './globals/global.service';
import { FootyService } from './footy/footy.service';
import { map, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverDoorsService implements Resolve<any> {
  isDoorOpen = false;

  constructor(
    private _globalService: GlobalService,
    private _footyService: FootyService,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    // move scrollbar to top
    window.scrollTo(0, 0);

    // console.log('Resolver route', route);
    // console.log('Resolver state', state.url);

    if (state.url === '/doors') {
      // close doors
      this._globalService.toggleDoors(true);

      return this._footyService.getEplTable().pipe(
        //tap((data: any) => {
        //  data.body
        // }),
        map((response: any) => response.body),
        // filter((data: any) => data.body),
        // take(1),
        delay(3000)
      );
      
    }

  }

}
