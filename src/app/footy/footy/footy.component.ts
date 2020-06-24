import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FootyService } from '../footy.service';
import { transition, animate, trigger, style, state } from '@angular/animations';

// https://www.positronx.io/understanding-angular-7-animations/

@Component({
  selector: 'app-footy',
  templateUrl: './footy.component.html',
  styleUrls: ['./footy.component.scss'],
  animations: [
    trigger('carouselSlider', [
      state('slide', 
        style({ 
          transform: 'translateX({{distance}}px)' 
        }), {params: {distance: 150}}
      ),

      transition('* => *', 
        animate('900ms')
      ),

    ])
  ],
})
export class FootyComponent implements OnInit {
  epl: any;
  eplTable: any;
  lfcMatches: any;
  
  // carousel
  @ViewChild('carousel', {static: true}) carousel: ElementRef;
  @ViewChild('carouselSlider', {static: true}) carouselSlider: ElementRef;
  totalSlides;
  slideCounter = 0;
  numberOfSlidesDisplayed;
  carouselWidth;
  slideHolderWidth;
  slideItemWidth = 150;
  carouselState;
  slideDistance;

  constructor(
    private footyService: FootyService,
  ) { }

  ngOnInit(): void {
    //
    this.getEplTable();
    this.getTeam();
    //
    this.setCarousel();

  }

  // Listen for window resize
  @HostListener('window:resize', ['$event'])
  onResize(e) {
    const vp = e.target.innerWidth;
    this.setCarousel();
  }

  setCarousel() {
    // Set carousel width and slides displayed count
    this.carouselWidth = (this.carousel.nativeElement as HTMLElement).offsetWidth;
    this.numberOfSlidesDisplayed = Math.floor(this.carouselWidth/this.slideItemWidth) - 1; //-1 for btn spacing
    this.slideHolderWidth = (this.numberOfSlidesDisplayed*this.slideItemWidth);
  }

  carouselSlide(slide) {
    // console.log('carouselSlide', slide);
    console.log('numberOfSlidesDisplayed', this.numberOfSlidesDisplayed);
    if(slide === 'right') {
      this.slideCounter++;
    } else {
      this.slideCounter--;
    }
    console.log('slideCounter', this.slideCounter);
    this.slideDistance = (this.slideCounter*this.slideItemWidth);
    this.carouselState = 'slide';
  }


  // Get EPL Table
  getEplTable() { 

    //
    this.footyService.getEplTable().subscribe(
      data => {
        this.epl = data.body;
        this.eplTable = data.body.standings[0].table;

      }, error => {

      }, () => {
        // complete
        // now get upcoming matches
        // have to do this after so we have crest
        this.getLfcUpcomingMatches();
      }

    );

  }


  // Get upcoming LFC matches
  getLfcUpcomingMatches() {

    //
    this.footyService.getLfcUpcomingMatches().subscribe(
      data => {
        
        this.lfcMatches = data.body.matches;
        
        console.log('table', this.eplTable);
        // get crest now
        for(let i = 0; i < this.lfcMatches.length; i++) {
          // home team
          const homeId = this.lfcMatches[i].homeTeam.id;
          const crest = this.eplTable.filter(o => o.team.id === homeId)[0].team.crestUrl; 
          this.lfcMatches[i].homeTeam.crestUrl = crest;
          // away team
          const awayId = this.lfcMatches[i].awayTeam.id;
          const crest2 = this.eplTable.filter(o => o.team.id === awayId)[0].team.crestUrl; 
          this.lfcMatches[i].awayTeam.crestUrl = crest2;
        }
        console.log(this.lfcMatches);
        this.totalSlides = this.lfcMatches.length;

      }, error => {

      }, () => {
        // complete
      }

    );

  }

  // get LFC
  getTeam() {

    //
    this.footyService.getTeam().subscribe(
      data => {
        
        console.log('Team', data.body);

      }, error => {

      }, () => {
        // complete
      }

    );

  }


}
