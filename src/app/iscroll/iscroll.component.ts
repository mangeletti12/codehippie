import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
//import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DialogService } from '../mat-confirm-dialog/mat-confirm-dialog.service';

import { IScrollService } from './iscroll.service';
//import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
//animation
import { transition, animate, trigger, state, style, query, animation, stagger, sequence } from '@angular/animations';


@Component({
  selector: 'iscroll',
  templateUrl: './iscroll.component.html',
  styleUrls: ['./iscroll.component.scss'],
  animations: [
    trigger('hideShowItems', [
      state('showItems', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hideItems', style({
        opacity: 0,
        transform: 'translateY(-700px)'
      })),
      transition('showItems => hideItems', animate('900ms ease-in')),
      transition('hideItems => showItems', animate('900ms ease-out'))
    ]),
    // Details
    trigger('hideShowDetails', [
      state('hideItems', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('showItems', style({
        opacity: 0,
        transform: 'translateY(-700px)'
      })),
      transition('* => *', animate('1000ms ease-out')),
    ]),
    ////////////////////
    trigger('items', [
      transition(':enter', [ // void => *
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1.5s cubic-bezier(.8, -0.6, 0.2, 1)', // 1 to not enlarge
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

    ]),


  ]
})
export class IScrollComponent implements OnInit {
  list: any[] = [];
  hideShowItemsState = 'showItems';
  //itemSize input property defined as the pixel height of each item.
  //The cdk-virtual-scroll-viewport must have a height and the items it loops over should also have a fixed height.
  //The component needs this information to calculate when an item should be rendered or removed.
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  batch = 20;
  theEnd = false;

  //infinite: Observable<any[]>;
  //
  currentPage: number = 1;
  //itemsRetrieved: number = 0;
  itemsTotal: number = 0;
  lastRenderedRange: number = 0;
  //
  selectedItem: any;
  //
  infiniteScrollThrottle = 300;
  infiniteScrollDistance = 1;
  infiniteScrollUpDistance = 2;
  direction = '';

  constructor(
    private iScrollService: IScrollService,
    private dialogService: DialogService,
  ) {

  }

  ngOnInit(): void {
    //
    this.getSWAPI();
  }

  onScrollDown(e) {
    console.log('scrolled down!!', e);

    // add another 20 items
    // const start = this.sum;
    // this.sum += 20;
    // this.appendItems(start, this.sum);

    this.direction = 'down';
    this.currentPage++;
    this.getSWAPI();
  }

  onUp(e) {
    console.log('scrolled up!', e);
    // const start = this.sum;
    // this.sum += 20;
    // this.prependItems(start, this.sum);

    this.direction = 'up';
  }


  // nextBatch(e, offset) {

  //   const end = this.viewport.getRenderedRange().end;
  //   const total = this.viewport.getDataLength();

  //   if (end === total) {
  //     //don't call if we have all items
  //     if (this.itemsRetrieved != this.itemsTotal) {
  //       //if we already made one call for that RenderedRange, don't do it again!
  //       if (this.lastRenderedRange != end) {

  //         console.log(`${end}, '>=', ${total}`);

  //         this.currentPage++;
  //         this.lastRenderedRange = end;
  //         this.getSWAPI();
  //       }
  //     }
  //   }


  // }


  //Get SW API
  getSWAPI() {

    this.iScrollService.getSWAPI(this.currentPage).subscribe(
      data => {
        console.log(data.body.results);

        //var firstPage = (data.body.previous == null) ? true : false;
        console.log(this.currentPage);
        if (this.currentPage === 1) {
          this.list = data.body.results;
          //Default, display first item
          //this.selectItem(this.list[0]);
        } else {
          this.list = this.list.concat(data.body.results);
        }

        //this.itemsRetrieved = this.list.length;
        this.itemsTotal = data.body.count;
      },
      error => {

      }

    );
  }

  //
  selectItem(item) {
    console.log(item);
    // Mark all non-selecetd, before mark the new selected
    this.list.forEach(i => { i.selected = false; });

    item.selected = !item.selected;
    this.selectedItem = item;
  }

  details(id, item, e) {
    //e.stopPropagation();
    this.hideShowItemsState = (this.hideShowItemsState === 'showItems') ? 'hideItems' : 'showItems';
    this.selectedItem = item;
    // this.list.forEach(i => { i.showItemDetails = 'hide'; });

    // this.list[id].showItemDetails = (this.list[id].showItemDetails === 'hide' || this.list[id].showItemDetails === undefined) ? 'show' : 'hide';

  }

  toggle() {
    this.hideShowItemsState = (this.hideShowItemsState === 'showItems') ? 'hideItems' : 'showItems';
  }

  //Remove
  remove(index, e) {
    e.stopPropagation();

    //call confirm box now
    this.dialogService.openConfirmDialog('Sure you want to delete this item?')
      .afterClosed().subscribe(
        data => {
          //console.log(data); //true or false
          //if yes/true
          if (data) {
            if (!this.list.length) { return; }
            //remove item from array
            this.list.splice(index, 1);
          }
        }
      );
  }




}
