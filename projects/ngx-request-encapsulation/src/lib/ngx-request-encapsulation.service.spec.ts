import { TestBed } from '@angular/core/testing';

import { NgxRequestEncapsulationService } from './ngx-request-encapsulation.service';

describe('NgxRequestEncapsulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRequestEncapsulationService = TestBed.get(NgxRequestEncapsulationService);
    expect(service).toBeTruthy();
  });
});
