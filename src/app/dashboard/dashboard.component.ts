import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    // this.getNasaNews();
  }


  getNasaNews() {

    this.dashboardService.getNasaRssFeed().subscribe(
      data => {
        console.log('nasa', data);

      },
      error => {

      }
    );

  }

}
