
import { sleep } from "@helpers/sleep";
import { GitHubIssuesResponse } from "../interfaces";
import { environment } from "@environments/environment";


const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIsues = async ():Promise<GitHubIssuesResponse[]> => {

    await sleep(1500);

    try {

        const resp = await fetch(
            `${ BASE_URL }/issues`,
            {
                headers: {
                    Authorization: `Bearer ${ GITHUB_TOKEN }`
                }
            }
        )

        if ( !resp.ok ) throw "Response error to get issues";

        const issues: GitHubIssuesResponse[] = await resp.json();

        return issues;

    } catch (error) {
        throw "Can't load issues"
    }

}