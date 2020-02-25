import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTrelloFeedbackComponent } from './ng-trello-feedback.component';

describe('NgTrelloFeedbackComponent', () => {
  let component: NgTrelloFeedbackComponent;
  let fixture: ComponentFixture<NgTrelloFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTrelloFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTrelloFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
