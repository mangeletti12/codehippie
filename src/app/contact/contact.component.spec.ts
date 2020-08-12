import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "../material/material.module";
// 
import { ContactService } from './contact.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MocksService {

  getSkills() {
    return of({
      data: [
        { level: 5, selected: true, skill: "Angular", type: "frontend" },
      ],
    });
  }
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [
        HttpClientTestingModule, 
        MaterialModule, 
        // BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ContactService, useClass: MocksService }]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('servive should be created', () => {
    expect(ContactService).toBeTruthy();
  });

  // it(`should call the onSubmit method`, () => {
  //   fixture.detectChanges();
  //   spyOn(component, 'onSubmit');
  //   el = fixture.debugElement.query(By.css('button')).nativeElement;
  //   console.log('el', el);
  //   el.click();
  //   expect(component.onSubmit).toHaveBeenCalledTimes(0);
  // });


});
