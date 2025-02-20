import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';
import { GitHubIssuesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string|null>(null);
  private queryClient = inject(QueryClient);
  //private queryClient = injectQueryClient();

  public issueQuery = injectQuery(() => ({
    queryKey: ['myIssueQueryByNumber', this.issueNumber()],
    queryFn: () => getIssueByNumber( this.issueNumber()! ),
    enabled: this.issueNumber !== null, // por defecto es true es deciir la query se dispara automaticamente
    staleTime: 1000 * 60 * 5
  }))

    
  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['myIssueQueryByNumberComments', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber( this.issueNumber()! ),
    enabled: this.issueNumber !== null, // por defecto es true es deciir la query se dispara automaticamente
    staleTime: 1000 * 60 * 5
  }))


  setIssueNumber( issueId:string ){
    this.issueNumber.set( issueId );
  }

  prefetchIssue( issueId:string ){
    this.queryClient.prefetchQuery({
      queryKey: ['myIssueQueryByNumber', issueId], // tipo estricto
      queryFn: () => getIssueByNumber( issueId ),
      staleTime: 1000 * 60 * 5 // 5 minutos para evitar multiples peticiones. es decir se solicitara la peticion de nuevo pasado 5 minutos una vez llamada
    })
  }

  prefetchComments( issueId:string ){
    this.queryClient.prefetchQuery({
      queryKey: ['myIssueQueryByNumberComments', issueId, 'comments'],
      queryFn: () => getIssueCommentsByNumber( issueId ),
      staleTime: 1000 * 60 * 5
    })
  }

  /**
   * Como la peticion https://api.github.com/repos/angular/angular/issues/ devuelve un array con 
   * cada uno de los Issue con toda su informacion nos podriamos ahorrar la peticion de un issue en concreto
   * de la peticion pj: https://api.github.com/repos/angular/angular/issues/59849 
   */
  setIssueData( issue: GitHubIssuesResponse ){
    this.queryClient.setQueryData(['myIssueQueryByNumber', issue.number.toString()], issue,{
      updatedAt: Date.now() * 1000 * 60 // 1 minuto // hace la misma funcionalidad que staleTime
    });
  }

}
