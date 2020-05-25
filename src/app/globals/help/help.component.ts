import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(
    private router: Router,
    private _globalService: GlobalService,
  ) { }

  ngOnInit(): void {
  }

  close() {
    // close slide out
    // console.log('-- CLOSE SlideOut --');
    //
    this._globalService.toggleSlideOut('close');

    this.router.navigate(['/about']);
  }

}
