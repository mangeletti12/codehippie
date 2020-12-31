import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
//
import { httpOptions } from '../http-options';

@Injectable()
export class MoviesService {
    private handleError: HandleError;
    //
    //https://developers.themoviedb.org/3/getting-started/authentication

    //https://www.themoviedb.org/settings/api
    //https://api.themoviedb.org/3/movie/550?api_key=a7a6226a9c423447649ca20a677cd62b
    apiKeyV3: string = 'a7a6226a9c423447649ca20a677cd62b';
    apiKeyV4: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2E2MjI2YTljNDIzNDQ3NjQ5Y2EyMGE2NzdjZDYyYiIsInN1YiI6IjVhNjY1ODIzYzNhMzY4NTcwMTAwM2QyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KF6hQu2DV1-oLJIT5YmLbJVcKKEEfqx4T0V8x5lIpeY';

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler
        ) {

        this.handleError = httpErrorHandler.createHandleError('MovieService');
      }

    getMovies(filters) {
      //
      //var urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKeyV3;
      //var urlTopRated= 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.apiKeyV3;
      //var urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.apiKeyV3;

      //filter
      let filter = '&language=en-US&include_adult=false&media_type=movie&include_video=false&vote_count.gte=0&list_style=1';

      // Are we Search or Discover?
      let urlType= 'discover';
      if (filters.search !== undefined && filters.search !== null) {
        urlType = 'search';
        filter += `&query=${filters.search}`;
      }
      const urlBase =  `https://api.themoviedb.org/3/${urlType}/movie?api_key=${this.apiKeyV3}`;

      // filter by year
      // console.log('filters', filters);
      if (filters !== undefined) {
         filter += `&primary_release_year=${filters.year}`;
      }

      // filter by genre
      // if(this.genre_id != "null") {
      //     this.filterByGenres = '&with_genres=' + this.genre_id;
      // }
      // else {
      //     this.filterByGenres = '';
      // }


      // filter by keyword
      // A comma separated list of keyword ID's. Only include movies that have one of the ID's added as a keyword.
      /*
      var keywordIds = this.keywordsArray.map(a => a.id);
      var strArrayKeywords = keywordIds.join(", ");
      this.filterByKeywords = '&with_keywords=' + encodeURIComponent(strArrayKeywords);
      */


      // page
      const page = '&page=' + filters.page;
      const url = urlBase + filter + page;

      return this.http.get(url)
        .pipe(
            catchError(this.handleError('GetMovies', []))
        );

    }

    //
    getGenres() {
      let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=' + this.apiKeyV3;

      return this.http.get(url)
        .pipe(
            catchError(this.handleError('GetGenres', []))
        );
    }


    // Call Service to get keywords
    getKeywords(keyword: any) {
      let url = 'https://api.themoviedb.org/3/search/keyword?query=' + keyword + '&api_key=' + this.apiKeyV3;

      return this.http.get(url)
        .pipe(
            catchError(this.handleError('GetKeywords', []))
        );
    }


    // https://developers.themoviedb.org/3/tv/get-popular-tv-shows
    // https://www.themoviedb.org/tv
    getPopularTV(filters) {
      // console.log('getPopularTV', filters);

      //filter
      let filter = '&language=en-US&include_adult=false';
      // if posting form
      // const formData = new FormData();
      // formData.append('page', filters.page);

      // sort
      if (filters.sort) {
        filter += `&sort_by=${filters.sort}`;
        // formData.append('sort_by', filters.sort);
      }

      // Are we Search or Discover?
      let urlType= 'discover';
      if (filters.search !== undefined && filters.search !== null) {
        urlType = 'search';
        filter += `&query=${filters.search}`;
      }
      const urlBase =  `https://api.themoviedb.org/3/${urlType}/tv?api_key=${this.apiKeyV3}`;

      // filter by keyword
      // A comma separated list of keyword ID's. Only include movies that have one of the ID's added as a keyword.
      /*
      var keywordIds = this.keywordsArray.map(a => a.id);
      var strArrayKeywords = keywordIds.join(", ");
      this.filterByKeywords = '&with_keywords=' + encodeURIComponent(strArrayKeywords);
      */

      // page
      const page = '&page=' + filters.page;
      const url = urlBase + filter + page;

      // return this.http.post(url, formData)
      return this.http.get(url)
        .pipe(
            catchError(this.handleError('getPopularTV', []))
        );

    }

    // my favs
    getMyTV() {
      const url = 'assets/tv.json';

      return this.http.get<any>(url, httpOptions)
        .pipe(
          catchError(this.handleError('getMyTV', []))
        );
    }



}
