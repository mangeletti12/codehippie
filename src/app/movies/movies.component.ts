import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
// animation
import { transition, animate, trigger, state, style } from '@angular/animations';
//Services
import { MoviesService } from './movies.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
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
export class MoviesComponent implements OnInit {
  hideShowItemsState = 'showItems';
  //itemSize input property defined as the pixel height of each item.
  //The cdk-virtual-scroll-viewport must have a height and the items it loops over should also have a fixed height.
  //The component needs this information to calculate when an item should be rendered or removed.
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  infiniteScrollThrottle = 300;
  infiniteScrollDistance = 1;
  infiniteScrollUpDistance = 2;

  // cardsCurrentPage: number = 1;
  moviesRetrieved: number = 0;
  moviesTotal: number = 0;
  //
  filterKeyword: string = '';
  keywordSearchList: any;

  selectedItem: any;
  // Movies
  movies: any;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 1; // movies API starts at 1
  pageSize = 25;
  totalRows = 0;
  bulkCheckbox = false;
  search: any;
  searchStatus = false;

  // Return today's date and time
  currentTime = new Date();
  // returns the year (four digits)
  filterableYears: any[] = [];
  primary_release_year: number = this.currentTime.getFullYear();
  selectedYear: number =  this.primary_release_year;

  constructor(
    private moviesService: MoviesService,
  ) {
  }

  ngOnInit(): void {

    this.getYears();
    this.getMovies();
    //this.filterByKeyword();
  }

  // Search listener
  searchBarEventHander(e) {
    // console.log('-- SEARCH', e);
    this.search = e;
    this.pageNumber = 1;
    this.getMovies();
  }

  onScrollDown(e) {
    // console.log('scrolled down!!', e);

    this.pageNumber++;
    this.getMovies();
  }

  onUp(e) {
    // console.log('scrolled up!', e);
  }

  getMoviesMeta() {

    this.moviesService.getGenres()
      .subscribe(
      data => {
        //console.log(data);

      },
      error => {
        var msg = { "State": "error", "Message": <any>error };

      }
      );

  }

  getYears() {
    var years = [];
    for(var i = this.primary_release_year; years.length <= 100; i--) {
        years.push(i);
    }
    this.filterableYears = years;
    // console.log('GetYears', this.filterableYears);
  }

  getMovies() {

    const filters = {
      year: this.selectedYear,
      page: this.pageNumber,
    }

    // check search
    if (this.search !== undefined && this.search.textSearch !== undefined && this.search.textSearch !== "") {
      filters['search'] = this.search.textSearch;
    }

    //
    this.searchStatus = true;
    this.moviesService.getMovies(filters)
      .pipe(
        debounceTime(500),     // wait N ms after each keystroke before considering the term
        distinctUntilChanged() // ignore if next search term is same as previous
      )
      .subscribe(
        data => {
          // console.log('GetMovies', data.results);
          if (this.pageNumber === 1) {
            this.movies = data['results'];

          } else {
            // this.movies = this.movies.concat(data['results']);
            // concatenate arrays
            this.movies = [...this.movies, ...data['results']];
          }

          this.moviesRetrieved = this.movies.length;
          this.moviesTotal = data['total_results'];
          this.searchStatus = false;
        }
      );

  }

  // Select year chance event handler
  selectYear(e: Event) {
    console.log('selectYear', e);
    this.pageNumber = 1;
    this.getMovies();
  }

  // Filter by keyword
  filterByKeyword() {

      //if (this.filterKeyword !== "" && this.filterKeyword.length >= 3) {
        //
        this.moviesService.getKeywords(this.filterKeyword)
          .pipe(
            debounceTime(500),     // wait N ms after each keystroke before considering the term
            distinctUntilChanged() // ignore if next search term is same as previous
          )
        .subscribe(
            data => {
                    console.log(data);
                    //this.keywordSearchList = data.body;
            });

    //}
  }


  selectItem(item) {
    // console.log('selectItem', item);
    // Mark all non-selecetd, before mark the new selected
    // this.heroes.forEach(i => { i.selected = false; });
    item.selected = !item.selected;
    this.selectedItem = item;
  }



}
