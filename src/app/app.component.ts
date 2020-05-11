import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthenticationService } from './security/auth.service';
import { AppUserAuth } from './security/app-user-auth';
import { RouterOutlet, Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from './globals/global.service';
import { login } from './route-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [login]
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: AppUserAuth;
  lastRoute: any;
  routeSearch: any;
  subscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private _globalService: GlobalService,
    public overlayContainer: OverlayContainer,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.authService.currentUser.subscribe(data => {
        //console.log('currentUser', data);
        //redirect if currentUser is null
        //Eventually this would be handeled by the auth.guard.ts
        if (data === null) {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login']);
          return false;
        }

        this.currentUser = data;
      });

      //////////////////////////////
      //Router event subscription
      router.events.subscribe((event: Event) => {

        if (event instanceof NavigationStart) {

        }

        if (event instanceof NavigationEnd) {
            this.lastRoute = event.url;
            this._globalService.toggleRoute(event.url);
        }

        if (event instanceof NavigationError) {

        }
    });


  }

  ngOnInit() {
    //console.log('AppComponent init');

    //Listen for theme change
    this.subscription = this._globalService.changeTheme.subscribe(data => {
      this.onSetTheme(data);
    });

    //Listen for nav change
    this.subscription = this._globalService.changeNavSide.subscribe(data => {

      this.renderer.removeClass(document.body, 'left');
      this.renderer.removeClass(document.body, 'right');
      this.renderer.addClass(document.body, data);
    });

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    //return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];

    //console.log("main route animation", outlet);
    //return outlet.isActivated ? outlet.activatedRoute : '';
  }

  onSetTheme(theme) {
    //console.log(theme);
    //set localStorage
    localStorage.setItem('k-theme', theme);

    this.overlayContainer.getContainerElement().classList.remove('light-theme', 'dark-theme', 'default-theme');
    this.overlayContainer.getContainerElement().classList.add(theme);
    //this.componentCssClass = theme;
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'default-theme');
    this.renderer.addClass(document.body, theme);
  }


}
