import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerListTwoComponent } from './picker-list-two.component';

describe('PickerListTwoComponent', () => {
  let component: PickerListTwoComponent;
  let fixture: ComponentFixture<PickerListTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerListTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerListTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
