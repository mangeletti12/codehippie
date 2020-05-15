import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from '../globals/global.service';

@Component({
  selector: 'main-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './global.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  nav: any;
  navStatus: boolean = false;
  navApps: any;
  isOpen = false;
  isAppsHolderOpen = false;
  subscription: Subscription;
  lastRouteUrl: string;
  appId: number;

  constructor(
    private _globalService: GlobalService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {

    // Default app nav
    this.appId = 0;

    //
    this.subscription = this._globalService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
      this.NavToggle(this.isOpen);
    });

    /////
    // Get the route and set
    this.subscription = this._globalService.changeRoute.subscribe(routeUrl => {
      //
      this.lastRouteUrl = routeUrl;
      this.getParentNavItem(routeUrl);
    });

    //
    this.getNav();
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  //Toggle
  hideShowSidebar() {
    this._globalService.toggle();
    //this.navStatus = !this.navStatus;
  }

  //Get Navigation from json
  getNav() {

    this._globalService.getNav()
      .subscribe(
        data => {
          console.log('nav', data.body);
          this.navApps = data.body.Navigation.App;

          // You just fetched ALL navs, should now cache this
          // and filter for selected app nav
          const nav = data.body.Navigation.App.filter(n => n.Id === this.appId)[0];
          this.nav = nav;

          // Called on page load is all
          this.getParentNavItem(this.lastRouteUrl);
          // hide app select
          this.isAppsHolderOpen = false;
        },
        error => {

        }
      );
  }

  //Toggle nav, to small nav
  NavToggle(openStatus: any) {
    //openStatus of false is big nav
    //openStatus of true is small nav
    //console.log('openStatus', openStatus);
    var activeNavGroup = [];

    if (this.nav) {
      activeNavGroup = this.nav.MenuItem.filter(i => i.Active);
      if (activeNavGroup.length > 0) {
        activeNavGroup[0].Active = false;
      }
    }

    //console.log('activeNavGroup', activeNavGroup.length);
    if (openStatus) {
      // Close nav apps
      this.isAppsHolderOpen = false;

      //nav open and menu active
      if (activeNavGroup.length > 0) {
        // Something you want delayed.
        //setTimeout(() => {
          //
          this.navStatus = openStatus;
        //}, 300); // How long do you want the delay to be (in milliseconds)?

      } else {
        //nav open, but no menu active
        //console.log('nav closing quick!');
        this.navStatus = openStatus;
      }
    } else {
      //closed nav > open nav
      //console.log('nav opening');
      this.navStatus = openStatus;
    }

  }

  //Get the parent H2 element
  getParentNavItem(routeUrl) {
    var parentItem;
    //
    if (this.nav !== undefined) {
      this.nav.MenuItem.forEach(i => {
        //console.log("link", i);
        i.MenuItem.forEach(x => {
          if (x.Url === routeUrl) {
            parentItem = i;
          }
        });
      });
    }
    //console.log("-- parent", parentItem);
    if (parentItem !== undefined) {
      this.navSelect(parentItem);
    } else {
      //Likely they are at the home page
      // let's close the nav now
      if (this.nav) {
        this.nav.MenuItem.forEach(i => { i.Active = false; });
      }
    }

  }

  //Click handler for nav h2
  navSelect(item: any) {
    //Mark ALL items inactive
    this.nav.MenuItem.forEach(i => { i.Active = false; });

    if (!this.navStatus) {
      //Mark passed in item active
      item.Active = true;
    }


    //no children, so goto Url
    if (item.Url !== undefined) {
      this.router.navigateByUrl(item.Url);
    }

  }

  // Open App Menu
  openAppMenu() {
    if (this.navStatus) {

    } else {
      this.isAppsHolderOpen = !this.isAppsHolderOpen;
    }
  }

  //
  getNavApp(nav: number) {
    this.appId = nav;
    this.isAppsHolderOpen = true;
    this.getNav();
  }


}
