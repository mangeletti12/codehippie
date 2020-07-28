import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from 'src/app/globals/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-elysium',
  templateUrl: './elysium.component.html',
  styleUrls: ['./elysium.component.scss']
})
export class ElysiumComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isNavSmall = false;

  constructor(
    private _globalService: GlobalService,
  ) { }

  ngOnInit(): void {

    // Listen for nav change
    this.subscription = this._globalService.change.subscribe(
      data => {
      console.log('nav small?', data);
      this.isNavSmall = data;
      //this.renderer.removeClass(document.body, 'left');
      //this.renderer.removeClass(document.body, 'right');
      //this.renderer.addClass(document.body, data);
    });

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }



}
