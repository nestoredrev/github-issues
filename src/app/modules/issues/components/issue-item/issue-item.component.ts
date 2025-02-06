import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssuesResponse, State } from '../../interfaces';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-item.component.html'
})
export class IssueItemComponent {

  public issue = input.required<GitHubIssuesResponse>();

  get isOpen() {
    return this.issue().state === State.Open;
  }

}
