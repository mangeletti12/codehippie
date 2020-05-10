import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//

//For jquery to work
declare var $: any;
declare var jQuery: any;
//External js
//declare var _NotificationMessageUI: any;

@Component({
  selector: 'rfi',
  templateUrl: './rfi.component.html',
  //styleUrls: ['./global.component.css']
})
export class RfiComponent implements OnInit {

  constructor(
    //public auth: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    //

  }


  
}