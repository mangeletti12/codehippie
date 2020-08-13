import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicComponent } from './music.component';
import { MaterialModule } from "../material/material.module";
// 
import { MusicService } from './music.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class MocksService {
  
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

describe('MusicComponent', () => {
  let component: MusicComponent;
  let fixture: ComponentFixture<MusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicComponent ],
      imports: [ HttpClientTestingModule, MaterialModule ], 
      providers: [{ provide: MusicService, useClass: MocksService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
