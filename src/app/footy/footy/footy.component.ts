import { Component, OnInit } from '@angular/core';
import { FootyService } from '../footy.service';

@Component({
  selector: 'app-footy',
  templateUrl: './footy.component.html',
  styleUrls: ['./footy.component.scss']
})
export class FootyComponent implements OnInit {

  constructor(
    private footyService: FootyService,
  ) { }

  ngOnInit(): void {
    this.getLfcUpcomingMatches();
    this.getAll();


  }

  getAll() {

    //
    this.footyService.getEplTable().subscribe(
      data => {
        console.log(data.body);

      }, error => {

      }, () => {
        //complete
      }

    );

  }



  getLfcUpcomingMatches() {

    //
    this.footyService.getLfcUpcomingMatches().subscribe(
      data => {
        console.log(data.body);

      }, error => {

      }, () => {
        //complete
      }

    );

  }


}
