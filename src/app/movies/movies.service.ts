import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

// Observable class extensions
//import 'rxjs/add/observable/of';
// Observable operators
//import 'rxjs/add/operator/toPromise';


//import { CookieService } from 'ngx-cookie-service';

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

    GetMovies() {
        //this.spinnerService.show('mySpinner');

        //
        var urlDiscover = 'https://api.themoviedb.org/3/discover/movie?api_key=' + this.apiKeyV3;
        //var urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKeyV3;
        //var urlTopRated= 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.apiKeyV3;
        //var urlNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.apiKeyV3;
        
        //filter       
        var filter = '&language=en-US&include_adult=false&media_type=movie&include_video=false&vote_count.gte=0&list_style=1&sort_by=popularity.desc';
        
        //filter by year
        /*
        if(this.primary_release_year != 0) {
            this.filterByYears = '&primary_release_year=' + this.primary_release_year;
        }
        else {
            this.filterByYears = '';
        }

        //filter by genre
        if(this.genre_id != "null") {
            this.filterByGenres = '&with_genres=' + this.genre_id;
        }
        else {
            this.filterByGenres = '';
        }
        */

        //filter by keywords
        //A comma separated list of keyword ID's. Only include movies that have one of the ID's added as a keyword.
        /*
        var keywordIds = this.keywordsArray.map(a => a.id);
        var strArrayKeywords = keywordIds.join(", ");
        this.filterByKeywords = '&with_keywords=' + encodeURIComponent(strArrayKeywords);
        */

        //page
        var page = '&page=' + 1;


        //let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        //let options = new RequestOptions({ headers: headers }); // Create a request option

        //let url = urlDiscover + filter + this.filterByGenres + this.filterByYears + this.filterByKeywords + page;
        let url = urlDiscover + filter + page;


        return this.http.get(url)
            .pipe(
                catchError(this.handleError('GetMovies', []))
            );

    }

    //
    GetGenres() {

        let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=' + this.apiKeyV3;

        return this.http.get(url)
            .pipe(
                catchError(this.handleError('GetGenres', []))
            );

    }


    //Call Service to get keywords
    GetKeywords(keyword: any) {
        console.log("GetKeywords");        
        //var page = '&page=1';

        //let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        //let options = new RequestOptions({ headers: headers }); // Create a request option

        let url = 'https://api.themoviedb.org/3/search/keyword?query=' + keyword + '&api_key=' + this.apiKeyV3;

        return this.http.get(url)
            .pipe(
                catchError(this.handleError('GetKeywords', []))
            );
        
    }



}