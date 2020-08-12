import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaComponent } from './qa.component';
// 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';// Other imports
import { QaService } from './qa.service';
import { HttpErrorHandler } from '../http-error-handler.service';
import { MessageService } from '../message.service';
import { MaterialModule } from "../material/material.module";

describe('QaComponent', () => {
  let component: QaComponent;
  let fixture: ComponentFixture<QaComponent>;
  let httpTestingController: HttpTestingController;
  let service: QaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaComponent ],
      imports: [ HttpClientTestingModule, MaterialModule ], 
      providers: [ 
        { QaService },
        HttpErrorHandler,
        MessageService
      ]
    })
    .compileComponents();

    // 
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(QaService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
