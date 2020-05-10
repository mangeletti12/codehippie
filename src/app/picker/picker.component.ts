import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PickerService } from './picker.service';



@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {
  currentPage = 1;
  itemsTotal = 0;
  lastRenderedRange = 0;
  swList: any[] = [];
  //
  @Output() public childEvent = new EventEmitter();


  constructor(
    private pickerService: PickerService,
  ) { }

  ngOnInit() {

    this.getSWAPI();
  }


  //Get SW API
  getSWAPI() {

    this.pickerService.getSWAPI(this.currentPage).subscribe(
      data => {
        console.log(data.body.results);

        //var firstPage = (data.body.previous == null) ? true : false;
        console.log(this.currentPage);
        if (this.currentPage === 1) {
          this.swList = data.body.results;
          //Default, display first item
          //this.selectItem(this.list[0]);
        } else {
          this.swList = this.swList.concat(data.body.results);
        }

        //this.itemsRetrieved = this.list.length;
        this.itemsTotal = data.body.count;
      },
      error => {

      }

    );
  }

  //
  itemSelect(item, e) {
    // console.log(item);
    item.selected = !item.selected;
    // console.log(this.swList);

    // Observable
    // his.pickerService.changeArray(item);

    // Emitter
    this.childEvent.emit(item);
  }



}
