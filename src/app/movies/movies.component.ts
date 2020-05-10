import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
//Services
import { MoviesService } from './movies.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: any;
  cardsCurrentPage: number = 1;
  moviesRetrieved: number = 0;
  moviesTotal: number = 0;

  filterKeyword: string = '';
  keywordSearchList: any;


   // Return today's date and time
   currentTime = new Date();
   // returns the year (four digits)
   year = this.currentTime.getFullYear();
   filterableYears: any;
   primary_release_year: number = this.year;

  constructor(
    //public auth: AuthService,
    private moviesService: MoviesService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    //this.GetMoviesMeta();
    this.GetYears();
    this.GetMovies();
    //this.filterByKeyword();
  }

  GetMoviesMeta() {

    this.moviesService.GetGenres()
      .subscribe(
      data => {
        //console.log(data);

      },
      error => {
        var msg = { "State": "error", "Message": <any>error };

      }
      );

  }

  GetYears() {
    var years = [];
    for(var i = this.year; years.length <= 100; i--) {
        years.push(i);
    }
    this.filterableYears = years;
}

  GetMovies() {

    this.moviesService.GetMovies()
      .pipe(
        debounceTime(500),     // wait N ms after each keystroke before considering the term
        distinctUntilChanged() // ignore if next search term is same as previous
      )
      .subscribe(
          data => {
                  //console.log(data);
                  this.movies = data;
                  //this.keywordSearchList = data.body;
          });

  }


  //Filter by keyword
  filterByKeyword() {

      //if (this.filterKeyword !== "" && this.filterKeyword.length >= 3) {
          //
          this.moviesService.GetKeywords(this.filterKeyword)
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


  filterByYear() {

  }


}
