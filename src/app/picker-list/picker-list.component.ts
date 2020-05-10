import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickerService } from '../picker/picker.service';
import { Subscription } from 'rxjs';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-picker-list',
  templateUrl: './picker-list.component.html',
  styleUrls: ['./picker-list.component.scss']
})
export class PickerListComponent implements OnInit, OnDestroy {
  swArray: any[] = [];
  subscription: Subscription;
  //
  public listItem: any;

  foods: Food[] = [
    {value: '0', viewValue: 'Steak'},
    {value: '1', viewValue: 'Pizza'},
    {value: '2', viewValue: 'Tacos'}
  ];

  constructor(
    private pickerService: PickerService,
  ) { }

  ngOnInit() {

    //Listen for theme change
    this.subscription = this.pickerService.getArray.subscribe(data => {
      //
      this.manageArray(data);
    });

    console.log(this.listItem);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  manageArray(data) {
    // console.log('picker-list', data);

    if (data.selected) {
      // add to array
      this.swArray.push(data);
    } else {
      // remove from array
      for (var i = 0; i < this.swArray.length; i++) {
        if ( this.swArray[i].name === data.name) {
          this.swArray.splice(i, 1);
          i--;
        }
      }
    }

  }


  // EventEmitter from child
  arrayChangeEvent(e) {
    console.log('arrayChangeEvent', e);

    if (e.selected) {
      // add to array
      this.swArray.push(e);
    } else {
      // remove from array
      for (var i = 0; i < this.swArray.length; i++) {
        if ( this.swArray[i].name === e.name) {
          this.swArray.splice(i, 1);
          i--;
        }
      }
    }

  }

  // Food Select change
  changeFood(value, item) {

    item.food = value;
    console.log(this.swArray);
  }





}
