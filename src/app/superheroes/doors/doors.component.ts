import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globals/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss']
})
export class DoorsComponent implements OnInit, OnDestroy {
  subs: Subscription

  constructor(
    private route: ActivatedRoute,
    private _globalService: GlobalService,
  ) { }

  ngOnInit(): void {
    // from resolver-doors.service.ts
    const routeData = this.route.snapshot.data;
    console.log('routeData', routeData.resolved);

    // Open doors now!
    this.subs = this._globalService.doorsTransition.subscribe(
      data => {
        // Toggle done with loading, if true, else no need
        if (data) {
          this._globalService.toggleDoors(false);
        }
      }
    );


  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
