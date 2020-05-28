import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SoccerService } from './soccer.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {


  constructor(
    private soccerService: SoccerService,

  ) {

  }


  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {

      // xAxes: [{
      //   display: false,
      //   ticks: {

      //   }
      // }],
      yAxes: [{
        ticks: {
          // reverse: true,
          stepSize: 1,
          min: 1,
          max: 20

        }
      }]

    }
  };

  barChartLabels: Label[] = [
    '00/01',
    '01/02',
    '02/03',
    '03/04',
    '04/05',
    '05/06',
    '06/07',
    '07/08',
    '08/09',
    '09/10',
    '10/11',
    '11/12',
    '12/13',
    '13/14',
    '14/15',
    '15/16',
    '16/17',
    '17/18',
    '18/19',
    '19/20',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [3,2,5,4,5,3,3,4,2,7,6,8,7,2,6,8,4,4,2,2],
      label: 'Liverpool Final Rankings',

    },
  ];

  ngOnInit(): void {
    // this.getAllTeams();
  }


  getAllTeams() {

    // console.log('searchCriteria', searchCriteria);
    this.soccerService.getLiverpool().subscribe(
      data => {
        //const heroes = data.body.data;
        console.log('teams', data);

      },
      error => {

      }
    );

  }


}
