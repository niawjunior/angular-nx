import { TestBed } from '@angular/core/testing';

import { ApiWelfarePageContentService } from './api-welfare-page-content.service';

describe('ApiWelfarePageContentService', () => {
  let service: ApiWelfarePageContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWelfarePageContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
