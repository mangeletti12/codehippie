import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, } from 'rxjs';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


@Injectable()
export class GlobalService {
  private handleError: HandleError;
  isOpen = false;
  private _change: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _changeTheme: BehaviorSubject<string> = new BehaviorSubject<string>('default-theme');
  private _changeRoute: BehaviorSubject<string> = new BehaviorSubject<string>('default');
  private _changeTransition: BehaviorSubject<string> = new BehaviorSubject<string>('fader');
  private _changeNavSide: BehaviorSubject<string> = new BehaviorSubject<string>('left');
  private _loadingDoors = new BehaviorSubject<boolean>(null);
  private _slideOut = new BehaviorSubject<string>('close');

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    ) {

    this.handleError = httpErrorHandler.createHandleError('GlobalService');

    const theme = localStorage.getItem('k-theme');
     if (theme !== undefined) {
      this._changeTheme.next(theme);
    }

    const trans = localStorage.getItem('k-trans');
    if (trans !== undefined) {
      this._changeTransition.next(trans);
    }

  }

  //Get Nav
  getNav() {
    const url = 'assets/main-nav.json';

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getNav', []))
      );
  }

  // Nav collapsed or open
  get change(): Observable<boolean> {
    return this._change.asObservable();
  }
  //
  toggle() {
    this.isOpen = !this.isOpen;
    this._change.next(this.isOpen);
  }

  //Listener
  get changeTheme(): Observable<string> {
    return this._changeTheme.asObservable();
  }
  //Change theme method
  toggleTheme(themeName) {
    this._changeTheme.next(themeName);
  }

  //Listener
  get changeRoute(): Observable<string> {
    return this._changeRoute.asObservable();
  }
  //Change route method
  toggleRoute(routeUrl) {
    this._changeRoute.next(routeUrl);
  }

  //Listener
  get changeTransition(): Observable<string> {
    return this._changeTransition.asObservable();
  }
  //Change transition
  toggleTransition(trans) {
    this._changeTransition.next(trans);
  }

  //Listener
  get changeNavSide(): Observable<string> {
    return this._changeNavSide.asObservable();
  }
  //Change transition
  toggleNavSide(side) {
    this._changeNavSide.next(side);
  }

  // Listener
  get doorsTransition(): Observable<boolean> {
    return this._loadingDoors.asObservable();
  }
  // Toggle Doors
  toggleDoors(action: boolean) {
    this._loadingDoors.next(action);
  }

  // Listener
  get slideOut(): Observable<string> {
    return this._slideOut.asObservable();
  }
  // Toggle SlideOut
  toggleSlideOut(status) {
    this._slideOut.next(status);
  }



  //Search Header
  searchHeader() {
    return this.http.get('assets/users.json')
      .pipe(
        catchError(this.handleError('searchHeader', []))
      );
  }

}
