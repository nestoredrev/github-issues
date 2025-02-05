import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubLabelResponse } from '../../interfaces';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html'
})
export class LabelsSelectorComponent {
  public labels = input.required<GitHubLabelResponse[]>();
}
