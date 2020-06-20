import { Component, OnInit } from '@angular/core';
import { FootyService } from '../footy.service';

@Component({
  selector: 'app-footy',
  templateUrl: './footy.component.html',
  styleUrls: ['./footy.component.scss']
})
export class FootyComponent implements OnInit {
  eplTable: any[] = [];
  lfcMatches: any[] = [];

  constructor(
    private footyService: FootyService,
  ) { }

  ngOnInit(): void {
    //
    this.getEplTable();
    

  }

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
          this.lfcMatches[i].homeTeam.crest = crest;
          // away team
          
        }
        console.log(this.lfcMatches);

      }, error => {

      }, () => {
        // complete
      }

    );

  }


}
