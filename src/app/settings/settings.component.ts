import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../globals/global.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  theme = 'default-theme';
  transition = 'slideLeft';
  // nav: any;

  transitions: string[] = ['slideLeft', 'fader', 'none'];

  constructor(
   private _globalService: GlobalService,
  ) {
  }

  ngOnInit(): void {

    const cookieTheme = localStorage.getItem('k-theme');
    // console.log('cookieTheme', cookieTheme);
    if (cookieTheme !== undefined && cookieTheme !== null && cookieTheme !== 'null') {
      this.theme = cookieTheme;
    }
    // console.log('theme', this.theme);

    const cookieTrans = localStorage.getItem('k-trans');
    // console.log('cookieTrans', cookieTrans);
    if (cookieTrans !== undefined && cookieTrans !== null && cookieTrans !== 'null') {
      this.transition = cookieTrans;
    }
    // console.log('transition', this.transition);

  }

  // This method is in app-component.ts
  onSetTheme(theme: string) {
    // console.log('onSetTheme', theme);
    localStorage.setItem('k-theme', theme);
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
