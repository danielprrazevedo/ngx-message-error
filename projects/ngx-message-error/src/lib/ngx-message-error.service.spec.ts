import { TestBed } from '@angular/core/testing';

import { NgxMessageErrorService } from './ngx-message-error.service';

describe('NgxMessageErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMessageErrorService = TestBed.get(NgxMessageErrorService);
    expect(service).toBeTruthy();
  });
});
