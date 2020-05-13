import { Component, OnInit } from '@angular/core';
import { ExternalService } from './external.service';

@Component({
  selector: 'app-buffet',
  providers: [ExternalService],
  templateUrl: './buffet.component.html',
  styleUrls: ['./buffet.component.scss']
})
export class BuffetComponent implements OnInit {

  constructor(

  ) {}

  ngOnInit(): void {


  }


}
