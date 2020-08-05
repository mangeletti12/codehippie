import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ExternalService } from './external.service';
import { PatternsService } from './patterns.service';
import { Subscription } from 'rxjs';
//
import { PizzaMaker, Pizza } from '../practice/practice.component';

@Component({
  selector: 'app-buffet',
  // providers: [ExternalService],
  templateUrl: './buffet.component.html',
  styleUrls: ['./buffet.component.scss']
})
export class BuffetComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  patterns: any[] = [];

  constructor(
    private patternsService: PatternsService,
  ) {}

  ngOnInit(): void {
    this.getPatterns();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPatterns() {

    this.subscription = this.patternsService.getPatterns().subscribe(
      data => {
        console.log('getPatterns', data.body.Patterns);
        this.patterns = data.body.Patterns;
       
      }
    )

  }


  boxSelect(pattern) {
    console.log('boxSelect', pattern);
    //
    if (pattern.selected) {
      // pattern.selected = true;
      this.patterns.forEach(i => { i.selected = null; });

    } else {

      // Mark all non-selecetd, before mark the new selected
      this.patterns.forEach(i => { i.selected = false; });

      pattern.selected = !pattern.selected;
    }

  }

  // remove later
  pizzaPlay() {

    const pizza1 = PizzaMaker.create({
      name: 'Inferno',
      toppings: ['cheese', 'peppers'],
    });

    console.log('pizzaPlay', pizza1);


    // const pizzaMaker = new Pizza('MKA Pie', ['cheese', 'pepperoni']);
    // console.log('pizzaMaker', pizzaMaker);
  }




}
