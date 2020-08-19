import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


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
    // this.getObservable();
    //
    this.getSubject();
    //
    // this.getBehaviorSubject();

  }

  //
  getPromise() {
    /* create a new promise. */
    const p = new Promise((resolve, error) => {
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

  // A Subject is like an Observable, but can multicast to many Observers.
  // Subjects are like EventEmitters: they maintain a registry of many listeners.
  // So, a subject is both an observable and an observer.
  // https://rxjs-dev.firebaseapp.com/guide/subject
  getSubject() {
    /* create an instance of Subject. */
    const s = new Subject<number>();

    /* Subscribe to subject. */
    s.subscribe(
      next => console.log('order pizza: ', next),
      error => console.warn(error),
      () => console.log('done with pizza!')
    );
    s.subscribe(
      next => console.log('order beer: ', next),
      error => console.warn(error),
      () => console.log('done with beer!')
    );

    /* Emit some values. */
    s.next(1);
    s.next(2);
    s.next(3);

    /* Subscribe late to subject. */
    s.subscribe(
      next => console.log('order ice-cream: ', next),
      error => console.warn(error),
      () => console.log('done with ice-cream!')
    );

    /* Late subscription will now receive Notification. */
    s.next(4);
    s.complete();
  }


  // BehaviorSubjects are useful for representing "values over time". 
  // For instance, an event stream of birthdays is a Subject, but the stream of a person's age would be a BehaviorSubject.
  // In the following example, the BehaviorSubject is initialized with the value 0 which the first Observer receives when it subscribes. 
  // The second Observer receives the value 2 even though it subscribed after the value 2 was sent.
  getBehaviorSubject() {
    const subject = new BehaviorSubject(0); // 0 is the initial value
 
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });
    
    subject.next(1);
    subject.next(2);
    
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });
    
    subject.next(3);
    
    // Logs
    // observerA: 0
    // observerA: 1
    // observerA: 2
    // observerB: 2
    // observerA: 3
    // observerB: 3
  }



}
