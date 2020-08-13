import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

import { RouterTestingModule } from '@angular/router/testing';

import { GlobalService } from '../global.service';
import { of, Observable } from 'rxjs';

class MocksService {
  
  get change(): Observable<boolean> {
    return of(true);
  }

}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ RouterTestingModule ],
      providers: [{ provide: GlobalService, useClass: MocksService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
