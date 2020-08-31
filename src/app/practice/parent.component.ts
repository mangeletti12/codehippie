import { Component, OnInit } from '@angular/core';
import { map, filter, takeUntil } from 'rxjs/operators';
import { timer, fromEvent } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  stages: string[];
  newIdeaer: string;
  addIdea: string;
  
  //
  users = [
    {name: 'John', id: 1},
    {name: 'Andrew', id: 2},
    {name: 'Anna', id: 3},
    {name: 'Iris', id: 4},
  ];

  blackListedUsers = [];

  selectedUserId = null;
  isUserBlackListed = false;
  allowBlackListedUsers = false;

  //
  readonly rows = [
    ["King Arthur", "-", "Arrested"],
    ["Sir Bedevere", "The Wise", "Arrested"],
    ["Sir Lancelot", "The Brave", "Arrested"],
    ["Sir Galahad", "The Chaste", "Killed"],
    ["Sir Robin", "The Not-Quite-So-Brave-As-Sir-Lancelot", "Killed"],
  ];


  constructor() { }

  ngOnInit(): void {
    
    // https://medium.com/angular-in-depth/rxjs-in-angular-part-1c5409610d8e


    // create observable that emits click events
    const source$ = fromEvent(document, 'click').pipe(
      map(event => event.target )
    );
    const subscribe = source$.subscribe(val => console.log(val));

  }

    
  getInputData(e: any) {
    const value = e.target.value;
    // console.log('value', value);
    
    // 
    this.stages = value // ['mark', 'sean', 'landon', 'sofie'];
    this.newIdeaer = value;
    
    // now clear
    // this.addIdea = '';
    e.target.value = '';
  }

  //
  changeUser() {
    this.isUserBlackListed = !!this.blackListedUsers.find(
      blackListedUserId => +this.selectedUserId === blackListedUserId
    );
  }



}
