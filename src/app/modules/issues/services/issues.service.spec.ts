
import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideTanStackQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { State } from "../interfaces";

describe('IssuesService', () => {

    let service: IssuesService;
    const queryClient = new QueryClient();

    beforeEach( () => {

        TestBed.configureTestingModule({
            teardown:{
                destroyAfterEach: false
            },
            providers: [
                provideTanStackQuery(queryClient)
            ]
        });
        service = TestBed.inject(IssuesService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    })

    it('should load labels', async () => {
        const { data } = await service.labelsQuery.refetch(); // asegurar de que el service nos devuelve los datos
        expect(data?.length).toBe(30);
        const [label] = data!; // devuelve el primer label
        expect(typeof label.color).toBe('string');
        expect(typeof label.default).toBe('boolean');
        expect(typeof label.id).toBe('number');
    })


    it('should set selected state: OPEN, CLOSED and ALL', async () => {
        
        service.showIssuesByState(State.Closed);
        expect( service.selectedState() ).toBe(State.Closed);

        const { data:dataClosed } = await service.issuesQuery.refetch();
        dataClosed?.forEach( issue => {
            expect( issue.state ).toBe( State.Closed );
        });

        service.showIssuesByState(State.Open);
        expect( service.selectedState() ).toBe(State.Open);

        const { data:dataOpen } = await service.issuesQuery.refetch();
        dataOpen?.forEach( issue => {
            expect( issue.state ).toBe( State.Open );
        });
    });

    it('should set selectedLabels',() => {
        service.toggleLabel('Accessibility');
        expect( service.selectedLabels().has('Accessibility') ).toBeTrue();

        service.toggleLabel('Accessibility');
        expect( service.selectedLabels().has('Accessibility') ).toBeFalse();
    });

    it('should set selectedLabels and get issues by label', async () => {
        const label = 'Accessibility';
        service.toggleLabel( label );
        expect( service.selectedLabels().has(label) ).toBeTrue();
        const { data } = await service.issuesQuery.refetch();

        data?.forEach( (issue) => {
            const hasLabel = issue.labels.some( (l) => l.name === label ) // some devuelve true al encontrar al menos un elemento que cumpla la condicion
            expect( hasLabel ).toBeTrue();
        });

    });

});