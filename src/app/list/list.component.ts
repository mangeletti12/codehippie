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

  constructor(
    private listService: ListService,
  ) {

  }

  ngOnInit(): void {
    this.getList(1);
    this.getList(2);
    this.getList(3);
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

  //Drop event
  onDrop(event: CdkDragDrop<string[]>) {
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

  //Select a care
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
