import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../globals/global.service';
import { fader, slideLeft } from '../route-animations';
import { Subscription } from 'rxjs';
import { HTTPStatus } from '../interceptors/loader.interceptor';
import { RouterOutlet } from '@angular/router';

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
    slideLeft,
    fader
  ]
})
export class SecureComponent implements OnInit, OnDestroy {
  // nav bar open or small
  isOpen = true;
  isDoorOpen = false;
  animationTrigger = 'slideLeft'; // default slideLeft
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
    // private router: Router,
  ) {

  }

  ngOnInit(): void {

    // Listen for Doors Open/Close
    // this.subscription = this._globalService.doorsTransition.subscribe(
    //   data => {

    //     if (data === 'closeDoors') {
    //       console.log('DOORS BITCH!', data);
    //       this.isDoorOpen = true;
    //     }
    //     if (data === 'openDoors') {
    //       console.log('DOORS BITCH!', data);
    //       this.isDoorOpen = false;
    //     }
    // });

    // Listen for route trans change
    this.subscription = this._globalService.changeTransition.subscribe(
      data => {
        const anim = (data !== null) ? data : 'slideLeft';
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

  // https://angular.io/guide/route-animations
  prepareRoute(outlet: RouterOutlet) {
    // console.log("route animation", outlet.activatedRoute);
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

  // This method is in app-component.ts
  onSetTheme(theme: string) {
    console.log('onSetTheme', theme);
    localStorage.setItem('k-theme', theme);
    this._globalService.toggleTheme(theme);
  }

}
