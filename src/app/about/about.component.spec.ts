import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { MaterialModule } from "../material/material.module";
// 
import { AboutService } from './about.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class MocksService {

  getSkills() {
    return of({
      data: [
        { level: 5, selected: true, skill: "Angular", type: "frontend" },
      ],
    });
  }
}

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [ HttpClientTestingModule, MaterialModule ], 
      providers: [{ provide: AboutService, useClass: MocksService }]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('servive should be created', () => {
    expect(AboutService).toBeTruthy();
  });

  it('should have a quote', () => {
    const quote = fixture.debugElement.query(By.css('.quote')).nativeElement;

    expect(quote.innerHTML).not.toBeNull();
    // console.log(quote.innerHTML)
    expect(quote.innerHTML.length).toBeGreaterThan(0);
  });

  it('should have YNWA', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#ynwa');
    expect(btn.innerHTML).toBe(`You'll never walk alone!`);
  });

  // const spy = spyOn(aboutService, 'getSkills').and.returnValue(of({...});

});
