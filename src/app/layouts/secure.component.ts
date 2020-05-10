import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../globals/global.service';
import { fader, slideLeft } from '../route-animations';
import { Subscription } from 'rxjs';

import { HTTPStatus } from '../interceptors/loader.interceptor';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';


export class SlideItem {
  id: number;
  name: string;
  status: boolean;
}

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [
    fader,
    slideLeft
  ]
})
export class SecureComponent implements OnInit, OnDestroy {
  // nav bar open or small
  isOpen = true;
  isDoorOpen = false;
  animationTrigger = 'slideLeft';
  subscription: Subscription;
  isSlideOutOpen = false;
  HTTPActivity: boolean;
  lastRoute: any;

  slideOutItems: SlideItem[] = [
    { 'id': 0, 'name': 'Profile', 'status': false },
    { 'id': 1, 'name': 'Notifications', 'status': false },
    { 'id': 2, 'name': 'Search', 'status': false }
  ];

  constructor(
    private _globalService: GlobalService,
    private httpStatus: HTTPStatus,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    /*
    //////////////////////////////
    //Router event subscription
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        console.log('-- NavigationStart --');

        if (event.url === this.lastRoute) {
          console.log('route -->', 'same');
        } else {
          console.log('route -->', 'diff');
          // this.isDoorOpen = true;
        }

      }

      if (event instanceof NavigationEnd) {
        console.log('-- NavigationEnd --');

      }

    });
    */

    // Listen for route trans change
    this.subscription = this._globalService.changeTransition.subscribe(
      data => {
        const anim = (data !== null) ? data : 'off';
        this.animationTrigger = anim;

        // console.log('animationTrigger', this.animationTrigger);
    });

    // Nav collapse click change
    this.subscription = this._globalService.change.subscribe(
      isOpen => {
        this.isOpen = isOpen;
        // console.log(this.isOpen);
    });

    //
    this.httpStatus.getHttpStatus().subscribe(
      (status: boolean) => {
        this.HTTPActivity = status;
        //console.log(status);
    });



  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    // console.log("route animation - secure", outlet);
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  //
  toggleSlideOut(action: string) {

    if (action !== 'close') {
      // Set the rest of the array to false status
      this.slideOutItems.forEach(function (item) {
        item.status = false;
      });

      var slideItemToShow = this.slideOutItems.find(i => i.name === action);
      slideItemToShow.status = true;

      //console.log(this.slideOutItems);
    }

    //
    this.isSlideOutOpen = !this.isSlideOutOpen;
  }

}
