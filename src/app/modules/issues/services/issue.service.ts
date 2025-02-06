import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string|null>(null);

  public issueQuery = injectQuery(() => ({
    queryKey: ['myIssueQueryByNumber', this.issueNumber()],
    queryFn: () => getIssueByNumber( this.issueNumber()! ),
    enabled: this.issueNumber !== null // por defecto es true es deciir la query se dispara automaticamente
  }))

    
  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['myIssueQueryByNumberComments', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber( this.issueNumber()! ),
    enabled: this.issueNumber !== null // por defecto es true es deciir la query se dispara automaticamente
  }))


  setIssueNumber( issueId:string ){
    this.issueNumber.set( issueId );
  }

}
