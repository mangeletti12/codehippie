import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootyComponent } from './footy.component';

describe('FootyComponent', () => {
  let component: FootyComponent;
  let fixture: ComponentFixture<FootyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootyComponent ]
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
