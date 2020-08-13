import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesComponent } from './superheroes.component';
import { SuperheroesService } from './superheroes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class MocksService {

  getJobs() {
    const data = {
      body: {
        matches: [
 
        ]
      }
    };
    return of(data);
  }
}


describe('SuperheroesComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperheroesComponent ],
      imports: [ HttpClientTestingModule ], 
      providers: [{ provide: SuperheroesService, useClass: MocksService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
