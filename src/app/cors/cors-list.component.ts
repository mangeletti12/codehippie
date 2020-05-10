import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CorService } from './cor.service';
//import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatCheckbox } from '@angular/material/checkbox';

//import { map, tap, scan, mergeMap, throttleTime, distinctUntilChanged } from 'rxjs/operators';
//https://material.angular.io/cdk/scrolling/overview
//https://angularfirebase.com/lessons/infinite-virtual-scroll-angular-cdk/

//animation
import { transition, animate, trigger, state, style, query, animation, stagger, sequence } from '@angular/animations';


@Component({
  selector: 'cor-list',
  templateUrl: './cors-list.component.html',
  styleUrls: ['./cors-list.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [ // void => *
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1)', // 1 to not enlarge
          style({
            transform: 'scale(1)',
            opacity: 1
          }))
      ]),
      transition(':leave', [ // * => void
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          }))
      ]),

    ])
  ]
})
export class CorsListComponent implements OnInit {
  list: any;

  //itemSize input property defined as the pixel height of each item.
  //The cdk-virtual-scroll-viewport must have a height and the items it loops over should also have a fixed height.
  //The component needs this information to calculate when an item should be rendered or removed.
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChild(MatCheckbox) chkBoxMultiSelect: MatCheckbox;

  batch = 20;
  theEnd = false;
  infinite: Observable<any[]>;
  //
  currentPage = 1;
  itemsRetrieved = 0;
  itemsTotal = 0;
  lastRenderedRange = 0;
  //
  selectedItems: any[] = [];
  lastSelectedItem: any;


  constructor(
    private corService: CorService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    //
    this.getChangeOrders();
  }


  nextBatch(e) {

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    //console.log( end + " - " + total);
    if (end === total) {
      //don't call if we have all items
      if (this.itemsRetrieved != this.itemsTotal) {
        //if we already made one call for that RenderedRange, don't do it again!
        if (this.lastRenderedRange !== end) {

          console.log(`${end}, '>=', ${total}`);

          this.currentPage++;
          this.lastRenderedRange = end;
          this.getChangeOrders();
        }
      }
    }

  }


  //Get Season Matches
  getChangeOrders() {

    this.corService.getChangeOrders(this.currentPage).subscribe(
      data => {
        // console.log(data.body.cors);

        //var firstPage = (data.body.previous == null) ? true : false;
        //console.log(this.currentPage);
        if (this.currentPage === 1) {
          this.list = data.body.cors;
          //Default, display first item
          this.selectItem(this.list[0]);
        } else {
          this.list = this.list.concat(data.body.cors);
        }

        this.itemsRetrieved = this.list.length;
        this.itemsTotal = data.body.count;
      },
      error => {

      }

    );
  }

  //Event handler for click of card
  selectItem(item) {

    var isMultiSelect = this.chkBoxMultiSelect.checked;
    this.lastSelectedItem = item;
    //console.log(isMultiSelect);

    if (!isMultiSelect) {
      //Mark all non-selecetd, before mark the new selected
      this.list.forEach(i => { i.selected = false; });
      item.selected = !item.selected;

      this.selectedItems = [];
      this.selectedItems.push(item);
    } else {
      //Multi Card
      item.selected = !item.selected;

      var indexInArray = this.selectedItems.findIndex(x => x.Number === item.Number);
      //console.log(indexInArray);
      //-1 no element found
      if (indexInArray === -1) {
        this.selectedItems.push(item);
      } else {
        //remove from array
        this.selectedItems.splice(indexInArray, 1);
      }
    }


  }

  newCOR() {
    console.log('cor');
    this.router.navigate(['cors', 0]);
  }

  onKeydown(item, e) {
    //console.log(e.key);

    //console.log(this.lastSelectedItem);
    var indexInArray = this.list.findIndex(x => x === this.lastSelectedItem);
    //var indexInArray = this.list.findIndex(x => x.selected === true);
    //console.log(indexInArray + " - " + this.list.length);
    if (e.key === 'ArrowDown') {
      var nextItem = this.list[indexInArray + 1];
      //Guard
      if (indexInArray + 1 < this.list.length) {
        this.selectItem(nextItem);
      }
    } else if (e.key === 'ArrowUp') {
      var prevItem = this.list[indexInArray - 1];
      //Guard
      if (indexInArray !== 0) {
        this.selectItem(prevItem);
      }
    }
  }


  //Sum a property in Array
  sumArrayProperty(items, prop) {
    return items.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  }

  getTotalCost() {
    var sumTotalCost = this.sumArrayProperty(this.selectedItems, 'Total_Cost');
    return sumTotalCost
  }

  getTotalAmountQuoted() {
    var sumAmountQuoted = this.sumArrayProperty(this.selectedItems, 'Amount_Quoted');
    return sumAmountQuoted
  }

  getTotalAmountApproved() {
    var sumAmountApproved = this.sumArrayProperty(this.selectedItems, 'Amount_Approved');
    return sumAmountApproved
  }



}
