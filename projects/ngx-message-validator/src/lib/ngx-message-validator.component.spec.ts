import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMessageValidatorComponent } from './ngx-message-validator.component';

describe('NgxMessageValidatorComponent', () => {
  let component: NgxMessageValidatorComponent;
  let fixture: ComponentFixture<NgxMessageValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMessageValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMessageValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
