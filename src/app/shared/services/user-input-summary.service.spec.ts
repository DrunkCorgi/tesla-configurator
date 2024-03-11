import { TestBed } from '@angular/core/testing';

import { UserInputSummaryService } from './user-input-summary.service';

describe('UserInputSummaryService', () => {
  let service: UserInputSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInputSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
