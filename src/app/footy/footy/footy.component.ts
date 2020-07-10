import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FootyService } from '../footy.service';
import { transition, animate, trigger, style, state } from '@angular/animations';

// https://www.positronx.io/understanding-angular-7-animations/

@Component({
  selector: 'app-footy',
  templateUrl: './footy.component.html',
  styleUrls: ['./footy.component.scss'],
  animations: [
    trigger("carouselSlider", [
      state(
        "initial",
        style({
          transform: "translateX({{offset}}px)"
        }),
        { params: { offset: 0 } }
      ),
      state(
        "slide",
        style({
          transform: "translateX({{distance}}px)"
        }),
        { params: { distance: 150 } }
      ),

      transition("initial => slide", animate("400ms")),
      transition("slide => initial", animate("0ms"))
  
    ])
  ]
})
export class FootyComponent implements OnInit {
  epl: any;
  eplTable: any;
  lfcMatches: any;
  lfcTeam: any;
  
  // carousel
  @ViewChild('carousel', {static: true}) carousel: ElementRef;
  // @ViewChild('carouselSlider', {static: true}) carouselSlider: ElementRef;
  totalSlides;
  slideCounter = 0;
  numberOfSlidesDisplayed;
  carouselWidth;
  slideHolderWidth;
  slideItemWidth = 150;
  offset = 0;
  carouselState;
  slideDistance = 0;

  constructor(
    private footyService: FootyService,
  ) { }

  ngOnInit(): void {
    //
    this.getEplTable();
    this.getTeam();
    //
    

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
    // season almost over
    // not enough slides so fix
    if (this.totalSlides < this.numberOfSlidesDisplayed) {
      this.numberOfSlidesDisplayed = this.totalSlides;
    }

    this.slideHolderWidth = (this.numberOfSlidesDisplayed*this.slideItemWidth);
    //
    // console.log('totalSlides', this.totalSlides);
    // console.log('numberOfSlidesDisplayed', this.numberOfSlidesDisplayed);
    // console.log('lfcMatches', this.lfcMatches);
  }

  //
  carouselSlide(slide) {
    // console.log('carouselSlide', slide);
    // console.log('numberOfSlidesDisplayed', this.numberOfSlidesDisplayed);

    if(slide === 'right') {
      this.slideCounter++;
    } else {
      this.slideCounter--;
    }
    // console.log('slideCounter', this.slideCounter);

    this.slideDistance = (this.slideCounter * this.slideItemWidth);
    this.carouselState = 'slide';
  }

  // https://angular.io/guide/transition-and-triggers#animation-callbacks
  onAnimationDone() {
    // the setTimeout is needed to defer the update or else you will get ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.offset = this.slideDistance;
      this.carouselState = 'initial';
    });
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
        
        // console.log('table', this.eplTable);
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
        // console.log('upcoming', this.lfcMatches);
        this.totalSlides = this.lfcMatches.length;

      }, error => {

      }, () => {
        // complete
        this.setCarousel();
      }

    );

  }

  // get LFC
  getTeam() {

    //
    this.footyService.getTeam().subscribe(
      data => {
        this.lfcTeam = data.body;
        const squadLength = this.lfcTeam.squad.length;
        for(let i = 0; i < squadLength; i++) {
          // position
          let abbrPosition;
          if (this.lfcTeam.squad[i].position === 'Goalkeeper') {
            abbrPosition = 'GK';
          }
          else if (this.lfcTeam.squad[i].position === 'Defender') {
            abbrPosition = 'Def';
          }
          else if (this.lfcTeam.squad[i].position === 'Midfielder') {
            abbrPosition = 'Mid';
          }
          else if (this.lfcTeam.squad[i].position === 'Attacker') {
            abbrPosition = 'Att';
          }

          this.lfcTeam.squad[i].pos = abbrPosition;
        }

        // console.log('Team', this.lfcTeam);

      }, error => {

      }, () => {
        // complete
      }

    );

  }


}