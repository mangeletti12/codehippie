import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './globals/global.service';
import { tap, filter, take, delay } from 'rxjs/operators';
//
// ngrx
import { Store } from '@ngrx/store';
// import { Superheroes } from './superheroes/models/superheroes';
import { State } from './superheroes/state/superheroes.state';
import * as HeroActions  from './superheroes/state/superheroes.actions';
import * as HeroSelectors from './superheroes/state/superheroes.selectors';
// import { reducers } from 'src/app/app.state';

@Injectable({ providedIn: 'root' })
export class ResolverDoorsService implements Resolve<any> {
  isDoorOpen = false;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 0;
  pageSize = 100;

  constructor(
    private _globalService: GlobalService,
    private store: Store<State>,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    // move scrollbar to top
    window.scrollTo(0, 0);

    // console.log('Resolver route', route);
    // console.log('Resolver state', state.url);

    if (state.url === '/superheroes/doors') {
      // close doors
      this._globalService.toggleDoors(true);

      // return setTimeout(() => {
      //   this.getFromStoreOrAPI();
      // }, 3000);
      return this.getFromStoreOrAPI();
      
      /*
      return this._footyService.getEplTable().pipe(
        //tap((data: any) => {
        //  data.body
        // }),
        map((response: any) => response.body),
        // filter((data: any) => data.body),
        // take(1),
        delay(3000)
      );
      */
      
    }

  }

  getFromStoreOrAPI(): Observable<any> {

    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
    };
    // console.log('getFromStoreOrAPI', searchCriteria);
    // return an Observable stream from the store
    return this.store
      // selecting the state using a feature selector
      .select(HeroSelectors.selectHeroes(0)).pipe(
        
        // the .tap() operator allows for a side effect, at this
        // point, I'm checking if the superhereos property exists on my
        // Store slice of state
        tap((data: any) => {
          // console.log('>>>', data);
          // if there are no items, dispatch an action to hit the backend
          if (!data) {
            // console.log('DB >', data);
            this.store.dispatch(HeroActions.getAllHeroes({ searchCriteria }));
          }
        }),
        // filter out data.superheroes, no length === empty!
        filter((data: any) => data),
        // which if empty, we will never .take()
        // this is the same as .first() which will only
        // take 1 value from the Observable then complete
        // which does our unsubscribing.
        delay(3000),
        take(1),
        
      );
  }



}
