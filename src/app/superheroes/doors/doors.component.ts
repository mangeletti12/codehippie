import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
// animation
import { transition, animate, trigger, style } from '@angular/animations';
// modal
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Overlay } from '@angular/cdk/overlay';
// service
import { MoviesService } from 'src/app/movies/movies.service';
import { HelperService } from 'src/app/helpers/helper.sevice';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/globals/global.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss'],
  animations: [
    // trigger('hideShowItems', [
    //   state('showItems', style({
    //     opacity: 1,
    //     transform: 'translateY(0)'
    //   })),
    //   state('hideItems', style({
    //     opacity: 0,
    //     transform: 'translateY(-700px)'
    //   })),
    //   transition('showItems => hideItems', animate('900ms ease-in')),
    //   transition('hideItems => showItems', animate('900ms ease-out'))
    // ]),
    // // Details
    // trigger('hideShowDetails', [
    //   state('hideItems', style({
    //     opacity: 1,
    //     transform: 'translateY(0)'
    //   })),
    //   state('showItems', style({
    //     opacity: 0,
    //     transform: 'translateY(-700px)'
    //   })),
    //   transition('* => *', animate('1000ms ease-out')),
    // ]),
    ////////////////////
    trigger('items', [
      transition(':enter', [ // void => *
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('900ms cubic-bezier(.8, -0.6, 0.2, 1)', // 1 to not enlarge
          style({
            transform: 'scale(1)',
            opacity: 1
          }))
      ]),
      transition(':leave', [ // * => void
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('700ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
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
export class DoorsComponent implements OnInit, OnDestroy, AfterViewInit {
  listSource: any[] = [];
  listSource2: any[] = [];
  // Defaults
  myTvSelected = 'vote_average~ZA';
  // pageNumber = 0; // marvel API starts at 0
  pageNumber = 1; // movies API starts at 1
  pageSize = 20;
  totalRows = 0;
  bulkCheckbox = false;
  searchKey: string;
  searchKeyTwo: string;
  sortBy: string;
  
  // allHeroes = 0;
  // filteredHeroes = 0;
  private subs: Subscription;
  public isSortOrFilter = false;
  // infinite scroll
  @ViewChild('anchor', { static: true })
  public anchor: ElementRef<HTMLElement>;
  private observer: IntersectionObserver;
  //
  public itemsTotalCount = 0;
  public itemsTotalCountTwo = 0;
  public isLoading = false;
  // selected items/counts
  public selectedItemsListOne: any[] = [];
  public selectedItemsListTwo: any[] = [];
  private holdListSourceTwo: any[] = [];

  sortColumns: any[] = [
    {value: 'popularity~AZ', viewValue: 'Popularity (A-Z)'},
    {value: 'popularity~ZA', viewValue: 'Popularity (Z-A)'},
    {value: 'vote_average~AZ', viewValue: 'Rating (A-Z)'},
    {value: 'vote_average~ZA', viewValue: 'Rating (Z-A)'},
    {value: 'first_air_date~AZ', viewValue: 'Release Date (A-Z)'},
    {value: 'first_air_date~ZA', viewValue: 'Release Date (Z-A)'},
    {value: 'name~AZ', viewValue: 'Title (A-Z)'},
    {value: 'name~ZA', viewValue: 'Title (Z-A)'},
  ];

  // TV
  currentTime = new Date();
  primary_release_year: number = this.currentTime.getFullYear();
  selectedYear: number =  this.primary_release_year;


  constructor(
    private helperService: HelperService,
    private moviesService: MoviesService,
    public matDialog: MatDialog,
    public overlay: Overlay,
    private _globalService: GlobalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // from resolver-doors.service.ts
    const routeData = this.route.snapshot.data;
    console.log('routeData', routeData.resolved);

    // Open doors now!
    this.subs = this._globalService.doorsTransition.pipe(
      delay(3000)
    ).subscribe(
      data => {
        // Toggle done with loading, if true, else no need
        if (data) {
          // this._globalService.toggleDoors(false);
        }
      }
    );
    

    // this.getPopularTV();
    // this.getMyTV();
  }

  ngAfterViewInit() {
    // this.infiniteScrollListener();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  getPopularTV() {

    // sort
    // if (this.sortBy) {

    // }

    const filters = {
      year: this.selectedYear,
      page: this.pageNumber,
      sort: this.sortBy,
    }

    // check search
    if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
      filters['search'] = this.searchKey.trim();
    }

    //
    // this.searchStatus = true;

    // Call API
    this.subs = this.moviesService.getPopularTV(filters)
      .pipe(
        debounceTime(500),     // wait N ms after each keystroke before considering the term
        distinctUntilChanged() // ignore if next search term is same as previous
      )
      .subscribe(
        data => {
          console.log('getPopularTV', data);

          if (this.pageNumber === 1) {
            this.listSource = data['results'];
          }
          else {
            this.listSource = this.listSource.concat(data['results']);
          }

          this.itemsTotalCount = data['total_results'];
          this.isLoading = false;

        }
      );

  }

  getMyTV() {
    this.subs = this.moviesService.getMyTV().subscribe(
      data => {
        // console.log('getMyTV', data.body.tv);
        // default sort
        const sortField = 'vote_average';
        const sortOrder = 'desc';
        const sortedArray = this.helperService.sortCollection(data.body.tv, sortField, sortOrder);
        // console.log('sortedArray', sortedArray);
        this.listSource2 = sortedArray;
        // this.itemsTotalCountTwo = this.listSource2.length;
      }
    );
  }

  // Infinite-scroll
  public infiniteScrollListener() {
    const config = {
      root: null as any,
      rootMargin: '0px',
      threshold: 0, // look this up
    };

    this.observer = new IntersectionObserver(([entry]) => {
      // if isIntersecting is true, the target element has become
      // as least as visible as the threshold that was passed in the config.
      if (entry.isIntersecting && !this.isLoading) {
        if (this.listSource.length !== this.itemsTotalCount) {
          console.log('--- SCROLLING');
          this.pageNumber++;
          //
          this.getPopularTV();
        }
      }
    }, config);
    //
    this.observer.observe(this.anchor.nativeElement);
  }

  // Drop event
  onDrop(event: CdkDragDrop<any[]>) {
    // console.log('onDrop', event);
    console.log('item >', event.previousContainer.data[event.previousIndex]);
    let isSwitchingLanes = false;

    if (event.container.id === "listOne" && event.previousContainer.id === "listTwo") {
      // console.log('moving LEFT!');
      isSwitchingLanes = true;
    }
    if (event.container.id === "listTwo" && event.previousContainer.id === "listOne") {
      // console.log('moving RIGHT!');
      isSwitchingLanes = true;
    }

    // Are we moving lanes?
    if (isSwitchingLanes) {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.panelClass = 'confirm-dialog-container';
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
      dialogConfig.height = "200px";
      dialogConfig.width = "400px";
      dialogConfig.data = {
        type: "confirm",
        title: "Remove",
        message: `Are you sure?`
      }
      // // https://material.angular.io/components/dialog/overview
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

      modalDialog.afterClosed().subscribe(
        data => {
          // console.log(`Dialog result: ${data}`);
          // if yes/true
          if (data) {
            //
            if (event.previousContainer === event.container) {
              moveItemInArray(event.container.data,
                event.previousIndex,
                event.currentIndex);
            } else {
              transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex, 
                event.currentIndex);
            }

          }
          modalDialog.close();
        }
      );

    }
    else {
      //
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data,
          event.previousIndex,
          event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex, 
          event.currentIndex);
      }
    }


  }

  // Select a card
  selectItem(item) {
    console.log('selectItem', item);
    // Mark all non-selecetd, before mark the new selected
    // this.heroes.forEach(i => { i.selected = false; });
    item.selected = !item.selected;
    // this.selectedItem = item;
    this.getSelectedCards();
  }
  // Get selected cards
  getSelectedCards() {
    this.selectedItemsListOne = this.listSource.filter(i => i.selected);
    this.selectedItemsListTwo = this.listSource2.filter(i => i.selected);
  }


  // Sort change handler
  onSortChange(e) {
    this.pageNumber = 1;
    // this.paginator.pageIndex = 0;
    // this.dataSource.data = null; // dataSource.data
    // this.sortOrder = e.direction;
    // this.sortField = e.active;
    // this.isSortOrFilter = true;
    let sortOrder = '';
    const sortable = e.value.split('~');
    if (sortable[1] === 'AZ') {
      sortOrder = 'asc';
    }
    else if (sortable[1] === 'ZA') {
      sortOrder = 'desc';
    }

    let sortField = sortable[0].toLowerCase();
    this.sortBy = `${sortField}.${sortOrder}`
    console.log('Sort', this.sortBy);
    this.getPopularTV();
  }

  // Sort change TWO handler
  onSortChangeTwo(e) {
    this.pageNumber = 1;
    const holdListSource = this.listSource2;
    this.listSource2 = [];
    // this.paginator.pageIndex = 0;
    // this.dataSource.data = null; // dataSource.data
    // this.sortOrder = e.direction;
    // this.sortField = e.active;
    // this.isSortOrFilter = true;
    let sortOrder = '';
    const sortable = e.value.split('~');
    if (sortable[1] === 'AZ') {
      sortOrder = 'asc';
    }
    else if (sortable[1] === 'ZA') {
      sortOrder = 'desc';
    }

    let sortField = sortable[0].toLowerCase();
    // this.sortBy = `${sortField}.${sortOrder}`
    // console.log('Sort 2', this.sortBy);

    const sortedArray = this.helperService.sortCollection(holdListSource, sortField, sortOrder);
    // console.log('sortedArray', sortedArray);

    // this is so the animation of exit and enter plays
    setTimeout(() => {
      this.listSource2 = sortedArray;
    }, 300);

  }

  // Search
  search(e) {
    // console.log('search', e);
    if (e.key === "Enter") {

      if (!this.searchKey) {
        console.log('Search empty');
        // this.clearSearch();
      }
      else {
        this.pageNumber = 1;
        // this.paginator.pageIndex = 0;
        // this.dataSource.data = null;
        // this.isSortOrFilter = true;
        this.getPopularTV();
      }

    }
  }

  // Clear search
  clearSearch() {
    // this.searchKey = '';
    // this.pageNumber = 0;
    // this.paginator.pageIndex = 0;
    // this.dataSource.data = null; // dataSource.data
    // this.isSortOrFilter = false;
    // this.getAllHeroes();
  }

  // Search My list
  searchTwo(e) {
    // console.log('searchTwo', this.searchKeyTwo);

    if (e.key === "Enter") {

      if (!this.searchKeyTwo) {
        console.log('Search empty');
        this.clearSearchTwo();
      }
      else {
        this.pageNumber = 1;
        // rehydrate list from ALL
        if (this.holdListSourceTwo.length > 0) {
          console.log('rehydate', this.holdListSourceTwo);
          this.listSource2 = this.holdListSourceTwo;
        }

        this.holdListSourceTwo = this.listSource2;
        // this.paginator.pageIndex = 0;
        // this.dataSource.data = null;
        // this.isSortOrFilter = true;
        // this.getPopularTV();
        const dataSource = new MatTableDataSource<any>();
        dataSource.data = this.holdListSourceTwo;
        dataSource.filter = this.searchKeyTwo.trim().toLowerCase();
        console.log('search 2 >', dataSource.filteredData);
        this.listSource2 = dataSource.filteredData;
      }

    }
  }

  // Clear search Two
  clearSearchTwo() {
    this.searchKeyTwo = '';
    this.pageNumber = 1;
    this.listSource2 = this.holdListSourceTwo;
  }

  // Move cards left
  moveLeft() {
    // console.log('moveLeft', this.selectedItemsListTwo);
    this.selectedItemsListTwo.forEach(element => {
      
      const index = this.listSource2.indexOf(element);
      this.listSource2[index].selected = false;
      this.listSource2.splice(index, 1);
      this.listSource.unshift(element);
    });

    this.selectedItemsListTwo = [];
  }

  // Move cards rigtht
  moveRight() {
    // console.log('moveRight', this.selectedItemsListOne);
    this.selectedItemsListOne.forEach(element => {

      const index = this.listSource.indexOf(element);
      this.listSource[index].selected = false;
      this.listSource.splice(index, 1);
      this.listSource2.unshift(element);
    });

    this.selectedItemsListOne = [];
  }

  // Remove
  remove(index, e) {
    e.stopPropagation();

    // const dialogConfig = new MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    // dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = 'confirm-dialog-container';
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    // dialogConfig.height = "200px";
    // dialogConfig.width = "400px";
    // dialogConfig.data = {
    //   type: "confirm",
    //   title: "Remove",
    //   message: 'Are you sure you want to remove this item?'
    // }
    // // // https://material.angular.io/components/dialog/overview
    // const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    // modalDialog.afterClosed().subscribe(
    //   data => {
    //     // console.log(`Dialog result: ${data}`);
    //     // if yes/true
    //     if (data) {
    //       if (!this.heroes.length) { return; }
    //       // remove item from array
    //       this.heroes.splice(index, 1);
    //     }
    //     modalDialog.close();
    //   }
    // );

  }

}
