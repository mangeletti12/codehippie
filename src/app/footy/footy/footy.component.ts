import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FootyService } from '../footy.service';
import { transition, animate, trigger, style, state } from '@angular/animations';


@Component({
  selector: 'app-footy',
  templateUrl: './footy.component.html',
  styleUrls: ['./footy.component.scss'],
  animations: [
    trigger('carouselSlider', [
      state('left', 
        style({ 
          transform: 'translateX(150px)' 
        }),
        
      ),

      state('right', 
        style({ 
          transform: 'translateX(-150px)' 
        }),

      ),

      transition('* => right', 
        animate('200ms')
      ),
      transition('* => left', 
        animate('200ms')
      ),
    ])
  ],
})
export class FootyComponent implements OnInit {
  eplTable: any[] = [];
  lfcMatches: any[] = [];
  // carousel
  @ViewChild('carousel', {static: true}) carousel: ElementRef;
  @ViewChild('carouselSlider', {static: true}) carouselSlider: ElementRef;
  carouselWidth;
  slideHolderWith;
  slideItemWidth = 150;
  carouselState;

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
    // math
    this.carouselWidth = (this.carousel.nativeElement as HTMLElement).offsetWidth;
    const numberOfSlidesDisplayed = Math.floor(this.carouselWidth/this.slideItemWidth);
    this.slideHolderWith = (numberOfSlidesDisplayed*this.slideItemWidth) - 150;
  }

  carouselSlide(slide) {
    console.log('carouselSlide', slide);
    // if(slide === 'left') {
    //   this.carouselState = 'right';
    // } else {
    //   this.carouselState = 'left';
    // }
    this.carouselState = slide;
  }

  // Get EPL Table
  getEplTable() { 

    //
    this.footyService.getEplTable().subscribe(
      data => {
        
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


  //
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

      }, error => {

      }, () => {
        // complete
      }

    );

  }

  //
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
