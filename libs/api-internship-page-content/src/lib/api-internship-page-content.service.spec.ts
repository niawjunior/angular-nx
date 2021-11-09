import { TestBed } from '@angular/core/testing';

import { ApiInternshipPageContentService } from './api-internship-page-content.service';

describe('ApiInternshipPageContentService', () => {
  let service: ApiInternshipPageContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInternshipPageContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
