import { environment } from "@environments/environment";
import { getIssueCommentsByNumber } from "./get-issue-comments-by-number.action";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const issueNumber = '123';
const mockComments:any[] = [
    { id: 1, body: 'First commnet', user: {login: 'user1'} },
    { id: 2, body: 'Second commnet', user: {login: 'user2'} },
]

describe('getIssueComments by number action', () => {

    it('should fetch issue comments succesfully', async () => {

        const requestURL = `${ BASE_URL }/issues/${ issueNumber }/comments`;
        const issueCommentsResponse = new Response( JSON.stringify(mockComments),{
            status: 200,
            statusText: 'OK'
        });

        spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse); //Preparacion
        const issue = await getIssueCommentsByNumber(issueNumber); // Actuacion
        expect(window.fetch).toHaveBeenCalledWith(requestURL,{ // Comprobacion
            headers:{
                Authorization: `Bearer ${GITHUB_TOKEN}`
            }
        })

    })

    it('should throw an error if the response is not ok', async () => {

        const issueCommentsResponse = new Response( null,{
            status: 404,
            statusText: 'Not Found'
        });

        spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse); //Preparacion
        try {
            const issue = await getIssueCommentsByNumber(issueNumber); // Actuacion
            expect(true).toBeFalse();
        } catch (error) {
            expect(error).toBe(`Can't load issue comments`)
        }
        
    })

})