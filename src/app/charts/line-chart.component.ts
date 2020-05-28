import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [3,2,5,4,5,3,3,4,2,7,6,8,7,2,6,8,4,4,2,1],
      label: 'Liverpool Final Rankings'

    },
  ];

  lineChartLabels: Label[] = [
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

  lineChartOptions = {
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
          // min: 20,
          // max: 1
        }
      }]

    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {

  }


}
