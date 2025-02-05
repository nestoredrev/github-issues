import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";

@Component({
  selector: 'app-isssues-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LabelsSelectorComponent
],
  templateUrl: './isssues-list-page.component.html'
})
export default class IsssuesListPageComponent {

  public issueService = inject(IssuesService);

  get labelsQuery() {
    return this.issueService.labelsQuery;
  }
  
}
