import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIsues, getLabels } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  public labelsQuery = injectQuery(() => ({
    queryKey: ['myLabelsQuery'],
    queryFn: () => getLabels(),
  }))


  public issuesQuery = injectQuery(() => ({
    queryKey: ['myIssuesQuery'],
    queryFn: () => getIsues(),
  }))

}
