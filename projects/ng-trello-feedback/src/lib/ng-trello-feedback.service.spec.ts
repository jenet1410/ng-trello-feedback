import { TestBed } from '@angular/core/testing';

import { NgTrelloFeedbackService } from './ng-trello-feedback.service';

describe('NgTrelloFeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTrelloFeedbackService = TestBed.get(NgTrelloFeedbackService);
    expect(service).toBeTruthy();
  });
});
