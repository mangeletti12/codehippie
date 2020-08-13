import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/security/auth.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    // private authService: AuthenticationService,
    private _globalService: GlobalService,
  ) { }

  ngOnInit() {
  }

  logout() {
    // this.authService.logout();
    // close slide out
    // console.log('-- CLOSE SlideOut --');
    //
    this._globalService.toggleSlideOut('close');

    this.router.navigate(['/login']);
  }


}
