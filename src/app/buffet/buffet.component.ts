import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ExternalService } from './external.service';
import { PatternsService } from './patterns.service';
import { Subscription } from 'rxjs';

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
    pattern.selected = !pattern.selected;

  }





}
