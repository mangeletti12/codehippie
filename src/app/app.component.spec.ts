import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';// Other imports
import { AuthenticationService } from './security/auth.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MaterialModule } from "./material/material.module";

// import { MocksService } from '../assets/mocks/mocks.service';
class MocksService extends AuthenticationService{
  // getSortData(data, rendererKey, type) {
  //     return [someRandomArray];
  // }
}

describe('AppComponent', () => {
  // 
  let httpTestingController: HttpTestingController;
  let service: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, MaterialModule ], 
      providers: [ { AuthenticationService, useClass: MocksService },
        HttpErrorHandler,
        MessageService
      ]
    }).compileComponents();

    // 
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthenticationService);

  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it('should be created', () => {
  //   const service: AuthenticationService = TestBed.get(AuthenticationService);
  //   expect(service).toBeTruthy();
  // });


  // it(`should have as title 'SUB'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('SUB');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to codehippie!');
  // });
});
