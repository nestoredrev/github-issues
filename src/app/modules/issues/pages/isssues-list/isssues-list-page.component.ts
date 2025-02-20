import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";
import { State } from '../../interfaces';

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

  onChangeState(newState: string){
    
    const state = {
      all: State.All,
      open: State.Open,
      closed: State.Closed
    }[newState] ?? State.All; // devuelve el objeto que coincida con [newState]  y si no devuelve "all"

    this.issueService.showIssuesByState(state);

  }
  
}
