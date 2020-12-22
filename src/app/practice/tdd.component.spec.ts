import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TddComponent } from './tdd.component';

describe('TddComponent', () => {
  let component: TddComponent;
  let fixture: ComponentFixture<TddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
