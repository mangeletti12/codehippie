import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamComponent } from './view-team.component';

import { SuperheroesModule } from '../superheroes.module';

describe('ViewTeamComponent', () => {
  let component: ViewTeamComponent;
  let fixture: ComponentFixture<ViewTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SuperheroesModule ],
      declarations: [ ViewTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
