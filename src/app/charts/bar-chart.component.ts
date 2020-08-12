import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {


  constructor(

  ) {

  }


  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // scales: {

    //   // xAxes: [{
    //   //   display: false,
    //   //   ticks: {

    //   //   }
    //   // }],
    //   yAxes: [{
    //     ticks: {
    //       // reverse: true,
    //       stepSize: 1,
    //       min: 1,
    //       max: 20

    //     }
    //   }]

    // }
  };
  // https://www.premierleague.com/stats/all-time
  barChartLabels: Label[] = [
    'Alan Shearer',
    'Wayne Rooney',
    'Andrew Cole',
    'Sergio Aguero',
    'Frank Lampard',
    'Thierry Henry',
    'Robbie Fowler',
    'Jermain Defoe',
    'Michael Owen',
    'Les Ferdinand',

  ];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [260,208,187,180,177,175,163,162,150,149],
      label: 'All-time Premier League Top Scorers',

    },
  ];

  barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(148,0,211,0.28)',
    },
  ];

  ngOnInit(): void {
  }





}
