import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermTableComponent } from './perm-table.component';

describe('PermTableComponent', () => {
  let component: PermTableComponent;
  let fixture: ComponentFixture<PermTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
