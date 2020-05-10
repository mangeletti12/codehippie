import { Component, OnInit, OnDestroy, Input } from '@angular/core';
//import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//
//import { GlobalService } from './global.service';
import { NavComponent } from '../globals/nav.component';
//
import { AppUserAuth } from '../security/app-user-auth';
import { AuthenticationService } from '../security/auth.service';
//
import { HTTPStatus } from '../interceptors/loader.interceptor';


@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./global.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  @Input() navComp: NavComponent;
  HTTPActivity: boolean;
  searching: boolean = false;
  currentUser: AppUserAuth;
  currentUserSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private httpStatus: HTTPStatus,
    //private _globalService: GlobalService,
    //private router: Router,
  ) {
    //
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      data => {
        this.currentUser = data;
    });

    //
    this.httpStatus.getHttpStatus()
    .subscribe(
      (status: boolean) => {
        this.HTTPActivity = status;
        //console.log(status);
      });

  }

  ngOnInit(): void {
    //console.log("--Header--");
    //console.log(this.currentUser);

    //this.subscription = this.authService.securityReset
    // .subscribe();

    /*
    //Come straight from full url on page load
    var routeData = this.route.root.firstChild.firstChild.snapshot.data['search'];
    this.getRouteData(routeData);

    //Nav link event
    this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var data = this.route.root.firstChild.firstChild.snapshot.data['search']
        this.getRouteData(data);
      }
    });
    */

    /*
    //https://www.toptal.com/angular-js/angular-4-forms-validation
    this.form = this.fb.group({
      searchHeader: [''],

      //dynamic fields (descriptors) added below
      //descriptors: this.fb.group({})
    });
    */

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    //this.subscription.unsubscribe();

    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  //Search Header
  // searchHeader() {
  //   this.searching = true;

  //   console.log("search");

  //   this._globalService.searchHeader()
  //     .subscribe(
  //     data => {
  //       console.log(data);
  //       this.searching = false;

  //     },
  //     error => {
  //       var msg = { "State": "error", "Message": <any>error };
  //       //external js
  //       this.searching = false;
  //     }
  //     );
  // }

}
