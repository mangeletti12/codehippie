import { Component, SimpleChange, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnChanges {

    @Input() title: string;
    @Input() value: number;

    constructor() {
    }

    // listen for changes to @input variables from parent and updated in component
    ngOnChanges(changes: { [value: number]: SimpleChange }) {
        for (const propName in changes) {
            this[propName] = changes[propName].currentValue;
        }
    }
}
