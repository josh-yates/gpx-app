import { TestBed } from '@angular/core/testing';

import { DataExtractorService } from './data-extractor.service';

describe('DataExtractorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataExtractorService = TestBed.get(DataExtractorService);
    expect(service).toBeTruthy();
  });
});
