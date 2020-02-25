import { NgModule } from '@angular/core';
import { NgTrelloFeedbackComponent } from './ng-trello-feedback.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [NgTrelloFeedbackComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [NgTrelloFeedbackComponent]
})
export class NgTrelloFeedbackModule { }
