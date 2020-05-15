import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavComponent } from '../globals/nav.component';
import { AppUserAuth } from '../security/app-user-auth';
import { HTTPStatus } from '../interceptors/loader.interceptor';
import { AuthenticationService } from '../security/auth.service';
import { GlobalService } from '../globals/global.service';


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
    private _globalService: GlobalService,
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

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    //this.subscription.unsubscribe();

    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  // This method is in app-component.ts
  onSetTheme(theme: string) {
    console.log('onSetTheme', theme);
    localStorage.setItem('k-theme', theme);
    this._globalService.toggleTheme(theme);
  }

}
