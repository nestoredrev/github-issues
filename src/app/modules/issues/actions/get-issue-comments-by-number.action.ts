
import { sleep } from "@helpers/sleep";
import { GitHubIssuesResponse } from "../interfaces";
import { environment } from "@environments/environment";


const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueCommentsByNumber = async ( issueNumber:string ):Promise<GitHubIssuesResponse[]> => {

    // await sleep(1500);

    try {

        const resp = await fetch(
            `${ BASE_URL }/issues/${ issueNumber }/comments`,
            {
                headers: {
                    Authorization: `Bearer ${ GITHUB_TOKEN }`
                }
            }
        )

        if ( !resp.ok ) throw "Response error to get issue comments";

        const issueComments: GitHubIssuesResponse[] = await resp.json();

        return issueComments;

    } catch (error) {
        throw "Can't load issue comments"
    }

}