import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerListComponent } from './picker-list.component';

describe('PickerListComponent', () => {
  let component: PickerListComponent;
  let fixture: ComponentFixture<PickerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
