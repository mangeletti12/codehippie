import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { RouterTestingModule } from '@angular/router/testing';

import { GlobalService } from '../global.service';
import { of, Observable } from 'rxjs';

class MocksService {
  
  get change(): Observable<boolean> {
    return of(true);
  }

}

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ],
      imports: [ RouterTestingModule ],
      providers: [{ provide: GlobalService, useClass: MocksService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
