import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../globals/global.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  theme: any;
  transition = 'slideLeft';
  // nav: any;

  transitions: string[] = ['slideLeft', 'fader', 'none'];

  constructor(
   private _globalService: GlobalService,
  ) {
  }

  ngOnInit(): void {

    const cookieTheme = localStorage.getItem('k-theme');
    if (cookieTheme !== undefined) {
      // console.log(cookieTheme);
      this.theme = cookieTheme;
    }

    const cookieTrans = localStorage.getItem('k-trans');
    if (cookieTrans !== undefined) {
      // console.log(cookieTrans);
      this.transition = cookieTrans;
    }

  }

  // This method is in app-component.ts
  onSetTheme(theme: string) {
    // console.log(theme);
    this._globalService.toggleTheme(theme);
  }

  // Set route transitions
  onSetTransition(trans: string) {
    // console.log('onSetTransition', trans);
    localStorage.setItem('k-trans', trans);
    this._globalService.toggleTransition(trans);
    // refresh!
    // not sure why this needs to be done
    // a bug, if you dont refresh routes dont work?
    window.location.reload();
  }

  // //Set nav side
  // onSetNav(navSide: string) {
  //   //console.log(navSide);
  //   this._globalService.toggleNavSide(navSide);
  // }


}
