import { TestBed } from '@angular/core/testing';

import { OdzService } from './odz.service';

describe('OdzService', () => {
  let service: OdzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
