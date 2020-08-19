import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { MaterialModule } from "../material/material.module";
// https://medium.com/@johncol/test-driven-development-and-angular-9110d62ce7ec
// https://scotch.io/tutorials/testing-angular-with-jasmine-and-karma-part-1
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
  //
  let service: MocksService;

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
    //
    service = new MocksService();
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
    console.log('>> ', quote.innerHTML);
    expect(quote.innerHTML.length).toBeGreaterThan(0);
  });

  it('should have YNWA', () => {
    const lfc = fixture.debugElement.nativeElement.querySelector('#ynwa');
    expect(lfc.innerHTML).toBe(`You'll never walk alone!`);
  });

  it('should return a list of skills asynchronously', (done: DoneFn) => {

    service.getSkills().subscribe({
      //
      next: (skills) => {
        console.log('>> ', skills);
        expect(skills).toBeTruthy();
        done();
      }
    });

  });

  // A spy allows us to “spy” on a function and track attributes about it such as whether or not it was called, 
  // how many times it was called, and with which arguments it was called.


});
