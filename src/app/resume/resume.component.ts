import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgwWowService } from 'ngx-wow';
import { Subscription }   from 'rxjs';
import { Router, Event, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, OnDestroy  {

  // https://animate.style/#documentation
  // https://wowjs.uk/docs.html
  // https://therichpost.com/how-to-implement-wow-js-in-angular-8/
  // https://www.npmjs.com/package/ngx-wow

  // keep refs to subscription to be abble to unsubscribe later
  // (NOTE: unless you want to be notified when an item is revealed by WOW,
  //  you absolutely don't need this line and related, for the library to work
  // only the call to `this.wowService.init()` at some point is necessary
  private wowSubscription: Subscription;

  constructor(
    private router: Router,
    private wowService: NgwWowService
  ) {

    this.wowService.init();
    //////////////////////////////
    // Router event subscription
    // router.events.subscribe((event: Event) => {

    //   if (event instanceof NavigationEnd) {
    //     // Reload WoW animations when done navigating to page,
    //     // but you are free to call it whenever/wherever you like
    //     this.wowService.init();
    //   }

    // });

  }

  ngOnInit(): void {
    // you can subscribe to WOW observable to react when an element is revealed
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item:HTMLElement) => {
        // do whatever you want with revealed element
        console.log('wow item', item);
      });

  }

  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    this.wowSubscription.unsubscribe();
  }

}
