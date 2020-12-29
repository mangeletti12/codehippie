import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

// https://bootsoon.github.io/ng-circle-progress/

@NgModule({
  imports: [
    CommonModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 14,
      space: -2,
      outerStrokeWidth: 2,
      innerStrokeWidth: 2,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#EAEAEA",
      animation: true,
      animationDuration: 300,
      showSubtitle: false,
      showUnits: false,
      titleFontSize: "12",
      lazy: false
    })
  ],
  exports: [
    NgCircleProgressModule
  ]
  
})
export class CircleProgressModule { }
