import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom',
    }
  };
  public pieChartLabels: Label[] = [
    'Real Madrid',
    'AC Milan',
    'Liverpool',
    'Bayern Munich',
    'Barcelona',
    'Ajax',
    'Inter Milan',
    'Manchester United',
    'Juventus',
    'Benfica'
  ];
  public pieChartData: SingleDataSet = [13, 7, 6, 5, 5, 4, 3, 3, 2, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // UEFA Champions League Titles

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
