import { TestBed } from '@angular/core/testing';

import { AdiService } from './adi.service';

describe('AdiService', () => {
  let service: AdiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
