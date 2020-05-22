import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
//
import { ListService } from './list.service';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list1: any[] = [];
  list2: any[] = [];
  list3: any[] = [];

  characters = [
    {name: "Mara Jade", side: "light"},
    {name: "Mace Windu", side: "light"},
    {name: "Obi-Wan Kenobie", side: "light"},
    {name: "Yoda", side: "light"},
    {name: "Kit Fisto", side: "light"},
    {name: "Ahsoka Tano", side: "light"},
    {name: "Darth Maul", side: "dark"},
    {name: "Count Dooku", side: "dark"},
    {name: "Aurra Sing", side: "dark"},
    {name: "Sheev Palpatine", side: "dark"},
    {name: "Revan", side: "dark"},
    {name: "Malak", side: "dark"},
  ];

  constructor(
    private listService: ListService,
  ) {

  }

  ngOnInit(): void {
    this.list1 = this.shuffle(this.characters);

    // this.getList(1);
    // this.getList(2);
    // this.getList(3);
  }

  // Shuffle array
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //Get list
  getList(pageNumber) {

    this.listService.getList(pageNumber).subscribe(
      data => {
        //console.log(data.body);
        if(pageNumber == 1) {
          this.list1 = data.body.results;
        }
        else if(pageNumber == 2) {
          this.list2 = data.body.results;
        }
        else if(pageNumber == 3) {
          this.list3 = data.body.results;
        }

      },
      error => {

      }

    );


  }

  // Drop event
  onDrop(event: CdkDragDrop<string[]>) {
    console.log('onDrop', event);

    //
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  // Select a care
  selectCard(item) {
    console.log(item);
    item.isSelected = !item.isSelected;
  }

  //Get selected cards
  getSelectedCards() {
    var selected = this.list1.filter(i => i.isSelected);
    console.log(selected);

  }


}
