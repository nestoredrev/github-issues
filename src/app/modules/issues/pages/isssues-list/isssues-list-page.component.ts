import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";

@Component({
  selector: 'app-isssues-list-page',
  standalone: true,
  imports: [
    CommonModule,
    LabelsSelectorComponent,
    IssueItemComponent
],
  templateUrl: './isssues-list-page.component.html'
})
export default class IsssuesListPageComponent {

  public issueService = inject(IssuesService);

  get labelsQuery() {
    return this.issueService.labelsQuery;
  }

  get issuesQuery() {
    return this.issueService.issuesQuery;
  }
  
}
