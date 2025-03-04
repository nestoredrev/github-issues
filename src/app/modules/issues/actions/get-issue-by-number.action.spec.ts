import { environment } from "@environments/environment";
import { getIssueByNumber } from "./get-issue-by-number.action";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const issueNumber = '123';

const mockIssue = {
    id: 123,
    number: issueNumber,
    description: '# Hola Mundo'
}

describe('getIssue by number action', () => {

    it('should fetch issue succesfully', async () => {

        const requestURL = `${ BASE_URL }/issues/${ issueNumber }`;
        const issueResponse = new Response( JSON.stringify(mockIssue),{
            status: 200,
            statusText: 'OK'
        });

        spyOn(window, 'fetch').and.resolveTo(issueResponse); //Preparacion
        const issue = await getIssueByNumber(issueNumber); // Actuacion
        expect(window.fetch).toHaveBeenCalledWith(requestURL,{ // Comprobacion
            headers:{
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        })

    })

    it('should not fetch issue succesfully', async () => {

        const issueResponse = new Response( null,{
            status: 404,
            statusText: 'Not Found'
        });

        spyOn(window, 'fetch').and.resolveTo(issueResponse); //Preparacion
        try {
            const issue = await getIssueByNumber(issueNumber); // Actuacion
            expect(true).toBeFalse();
        } catch (error) {
            expect(error).toBe(`Can't load issue ${issueNumber}`)
        }

    })

})