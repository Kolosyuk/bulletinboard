import { TestBed } from '@angular/core/testing';

import { YamapsService } from './yamaps.service';

describe('YamapsService', () => {
  let service: YamapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YamapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
