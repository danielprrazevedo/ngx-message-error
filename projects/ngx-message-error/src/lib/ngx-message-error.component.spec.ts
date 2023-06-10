import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { NgxMessageErrorComponent } from './ngx-message-error.component';

describe('NgxMessageErrorComponent', () => {
  let component: NgxMessageErrorComponent;
  let fixture: ComponentFixture<NgxMessageErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMessageErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMessageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
