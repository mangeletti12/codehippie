import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from '../globals/global.service';
import { fader, slideLeft } from '../route-animations';
import { Subscription } from 'rxjs';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'public',
  templateUrl: './public.component.html',
  animations: [
    fader,
    slideLeft
  ]
})
export class PublicComponent implements OnInit, OnDestroy {
  // nav bar open or small
  isOpen = true;
  animationTrigger = 'slideLeft';
  subscription: Subscription;

  constructor(
    private _globalService: GlobalService,
  ) {

  }

  ngOnInit(): void {
    //Listen for route trans change
    this.subscription = this._globalService.changeTransition.subscribe(data => {
      this.animationTrigger = data;
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


}
