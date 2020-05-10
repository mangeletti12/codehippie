import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickerService } from '../picker/picker.service';
import { Subscription } from 'rxjs';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-picker2-list',
  templateUrl: './picker-list-two.component.html',
  styleUrls: ['./picker-list-two.component.scss']
})
export class PickerListTwoComponent implements OnInit, OnDestroy {
  swArray: any[] = [];
  subscription: Subscription;

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
    // this.subscription = this.pickerService.getArray.subscribe(data => {
    //   //
    //   this.manageArray(data);
    // });

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    // this.subscription.unsubscribe();
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

  // Food Select change
  changeFood(value, item) {

    item.food = value;
    console.log(this.swArray);
  }





}
