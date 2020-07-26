import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElysiumComponent } from './elysium.component';

describe('ElysiumComponent', () => {
  let component: ElysiumComponent;
  let fixture: ComponentFixture<ElysiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElysiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElysiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
