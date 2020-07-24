import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  stages: string[];
  newIdeaer: string;
  addIdea: string;
  
  constructor() { }

  ngOnInit(): void {
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

}
