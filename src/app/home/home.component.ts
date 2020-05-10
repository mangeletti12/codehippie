import { Component, OnInit } from '@angular/core';
import { ExternalService } from './external.service';

@Component({
  selector: 'home',
  providers: [ExternalService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(

  ) {}

  ngOnInit(): void {


  }


}
