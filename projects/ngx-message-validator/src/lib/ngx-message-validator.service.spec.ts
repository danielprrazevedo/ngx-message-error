import { TestBed } from '@angular/core/testing';

import { NgxMessageValidatorService } from './ngx-message-validator.service';

describe('NgxMessageValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMessageValidatorService = TestBed.get(NgxMessageValidatorService);
    expect(service).toBeTruthy();
  });
});
