import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// https://brianflove.com/2018-03-04/rxjs-the-basics/

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //
    this.getPromise();
    //
    this.getObservable();
  }

  //
  getPromise() {
    /* create a new promise. */
    const p = new Promise(resolve => {
      // In this example, we are simply using the setTimeout() function to resemble an asynchronous event.
      setTimeout(() => {
        resolve('Hello from Promiseland!');
      }, 1000);
    });

    /* log single value that is emitted. */
    p.then(value => console.log(value));

  }

  //
  getObservable() {

    /* create a new observable, providing the subscribe function. */
    const observable: Observable<string> = new Observable(observer => {
      //
      const interval = setInterval(() => {
        observer.next('Hello from Observableland!');
      }, 2000);

      // teardown
      return () => {
        clearInterval(interval);
      };
    });

    /* Subscribe to Notifications. */
    observable.subscribe(value => console.log(value));


  }

}
