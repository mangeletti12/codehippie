import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { httpOptions } from '../http-options';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { TddComponent } from './tdd.component';
import { TddService } from './tdd.service';

describe('TddComponent', () => {
  let component: TddComponent;
  let fixture: ComponentFixture<TddComponent>;

});

//
describe('TddService', () => {
  let service: TddService;
  let http: HttpClient;
  //
  beforeEach(() => {

    service = new TddService(http);
  });

  //
  it('should return a list of registered accounts asynchronously', (done: DoneFn) => {
    //
    service.getAlerts().subscribe({
      next: (alerts: any[]) => {
        console.log('spec alerts', alerts);
        expect(alerts).toBeTruthy();
        done();

      }

    });

  });

});
