import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElysiumComponent } from './elysium.component';
//
import { GlobalService } from 'src/app/globals/global.service';
import { of, Observable } from 'rxjs';

class MocksService {
  
  get change(): Observable<boolean> {
    return of(true);
  }

}

describe('ElysiumComponent', () => {
  let component: ElysiumComponent;
  let fixture: ComponentFixture<ElysiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElysiumComponent ],
      providers: [{ provide: GlobalService, useClass: MocksService }]
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
