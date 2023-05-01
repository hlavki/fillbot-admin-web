import { TestBed } from '@angular/core/testing';

import { WebPageDetailDataService } from './web-page-detail-data.service';

describe('WebPageDetailDataService', () => {
  let service: WebPageDetailDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPageDetailDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
