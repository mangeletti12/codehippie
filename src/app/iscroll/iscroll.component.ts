import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
// animation
import { transition, animate, trigger, state, style } from '@angular/animations';
import { SuperheroesService } from '../superheroes/superheroes.service';
// modal
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


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

  // batch = 20;
  // theEnd = false;

  itemsTotal: number = 0;
  lastRenderedRange: number = 0;
  //
  selectedItem: any;
  //
  infiniteScrollThrottle = 300;
  infiniteScrollDistance = 1;
  infiniteScrollUpDistance = 2;

  // Heroes
  heroes: any;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 0;
  pageSize = 25;
  totalRows = 0;
  bulkCheckbox = false;
  searchKey: string;

  constructor(
    private superheroesService: SuperheroesService,
    public matDialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    // this.getSWAPI();
    this.getAllHeroes();
  }

  onScrollDown(e) {
    console.log('scrolled down!!', e);

    this.pageNumber++;
    // this.getSWAPI();
    this.getAllHeroes();
  }

  onUp(e) {
    console.log('scrolled up!', e);
  }

  getAllHeroes() {
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      // offset: (this.pageNumber - 1) * this.pageSize + 1,
    };

    if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
      searchCriteria['nameStartsWith'] = this.searchKey.trim();
    }

    // console.log('searchCriteria', searchCriteria);
    this.superheroesService.getAllHeroes(searchCriteria).subscribe(
      data => {
        // this.heroes = data.body.data.results;
      if (this.pageNumber === 0) {
        this.heroes = data.body.data.results;

      } else {
        this.heroes = this.heroes.concat(data.body.data.results);
      }
        // console.log('heroes', this.heroes);
        this.totalRows = data.body.data.total;
      },
      error => {

      }
    );

  }

  //Get SW API
  // getSWAPI() {

  //   this.iScrollService.getSWAPI(this.currentPage).subscribe(
  //     data => {
  //       console.log(data.body.results);

  //       //var firstPage = (data.body.previous == null) ? true : false;
  //       console.log(this.currentPage);
  //       if (this.currentPage === 1) {
  //         this.list = data.body.results;
  //         //Default, display first item
  //         //this.selectItem(this.list[0]);
  //       } else {
  //         this.list = this.list.concat(data.body.results);
  //       }

  //       //this.itemsRetrieved = this.list.length;
  //       this.itemsTotal = data.body.count;
  //     },
  //     error => {

  //     }

  //   );
  // }

  //
  selectItem(item) {
    // console.log('selectItem', item);
    // Mark all non-selecetd, before mark the new selected
    this.heroes.forEach(i => { i.selected = false; });
    item.selected = !item.selected;
    this.selectedItem = item;
  }

  details(id, item, e) {
    e.stopPropagation();
    console.log('details', item);
    // Mark all non-selecetd, before mark the new selected
    this.heroes.forEach(i => { i.selected = false; });
    item.selected = !item.selected;
    this.selectedItem = item;

    this.hideShowItemsState = (this.hideShowItemsState === 'showItems') ? 'hideItems' : 'showItems';
  }

  toggle() {
    this.hideShowItemsState = (this.hideShowItemsState === 'showItems') ? 'hideItems' : 'showItems';
  }

  //Remove
  remove(index, e) {
    e.stopPropagation();

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.height = "200px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      type: "confirm",
      title: "Remove",
      message: 'Are you sure you want to remove this item?'
    }
    // // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(
      data => {
        console.log(`Dialog result: ${data}`);
        // if yes/true
        if (data) {
          if (!this.heroes.length) { return; }
          // remove item from array
          this.heroes.splice(index, 1);
        }
        modalDialog.close();
      }
    );


  }


}
