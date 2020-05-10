import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

//The auth guard is used to prevent unauthenticated users from accessing restricted routes

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // Get claim type on security object to check
    let claimType: string = route.data['claimType'];
    //console.log(claimType);

    console.log('auth.guard.ts');

    // Check security claim
    const currentUser = this.authService.currentUserValue;

    if (currentUser
       && this.authService.hasClaim(claimType)
      ) {
        // authorised so return true
        return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

  }
}
