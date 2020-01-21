import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRequestEncapsulationComponent } from './ngx-request-encapsulation.component';

describe('NgxRequestEncapsulationComponent', () => {
  let component: NgxRequestEncapsulationComponent;
  let fixture: ComponentFixture<NgxRequestEncapsulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRequestEncapsulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRequestEncapsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
