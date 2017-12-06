import { TestBed, inject } from '@angular/core/testing';

import { ThreadDataService } from './thread-data.service';

describe('ThreadDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreadDataService]
    });
  });

  it('should be created', inject([ThreadDataService], (service: ThreadDataService) => {
    expect(service).toBeTruthy();
  }));
});
