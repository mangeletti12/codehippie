import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FootyComponent } from './footy.component';
import { MaterialModule } from "../../material/material.module";
import { TruncatePipe } from '../../pipes/truncate.pipe';
//
import { FootyService } from '../footy.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MocksService {
  
  getEplTable() {
    const data = {
      body: {
        competition: {
          code: "PL",
          id: 2021,
          lastUpdated: "2020-07-27T02:35:01Z",
          name: "Premier League",
          plan: "TIER_ONE",
        },
        season: {
          currentMatchday: 37,
          endDate: "2020-07-25",
          id: 468,
          startDate: "2019-08-09",
          winner: null
        },
        standings: [
          {
            group: null,
            stage: "REGULAR_SEASON",
            table: [{
              draw: 3,
              goalDifference: 52,
              goalsAgainst: 33,
              goalsFor: 85,
              lost: 3,
              playedGames: 38,
              points: 99,
              position: 1,
              team: {id: 64, name: "Liverpool FC", crestUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"},
              won: 32
            }],
            type: "TOTAL"
          }]
      }
    };
    console.log('------------ DATA', data);
    return of(data);
  }

  getTeam() {
    const data = {
      body: {
        squad: [{
          dateOfBirth: "1992-10-02T00:00:00Z",
          id: 1795,
          name: "Alisson",
          nationality: "Brazil",
          position: "Goalkeeper",
          role: "PLAYER",
          shirtNumber: null,
          countryOfBirth: "Brazil"
        }]
      }
    };
    return of(data);


  }

  getLfcUpcomingMatches() {
    const data = {
      body: {
        matches: [
 
        ]
      }
    };
    return of(data);
  }

}

describe('FootyComponent', () => {
  let component: FootyComponent;
  let fixture: ComponentFixture<FootyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FootyComponent, TruncatePipe ],
      imports: [ BrowserAnimationsModule, MaterialModule ],
      providers: [{ provide: FootyService, useClass: MocksService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
