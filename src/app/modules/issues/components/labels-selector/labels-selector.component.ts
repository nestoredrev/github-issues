import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { GitHubLabelResponse } from '../../interfaces';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html'
})
export class LabelsSelectorComponent {
  public labels = input.required<GitHubLabelResponse[]>();
  public issuesService = inject(IssuesService);

  public isSelectedLabel( labelName:string ){
    return this.issuesService.selectedLabels().has( labelName );
  }

  public onToggleLabel( labelName:string ){
    this.issuesService.toggleLabel( labelName );
  }
}
