
import { sleep } from "@helpers/sleep";
import { GitHubIssuesResponse, State } from "../interfaces";
import { environment } from "@environments/environment";


const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIsues = async ( state:State = State.All, selectedLabels: string[] ):Promise<GitHubIssuesResponse[]> => {

    const params = new URLSearchParams();
    params.append('state', state);

    if(selectedLabels.length > 0){
        params.append('labels', selectedLabels.join(','));
    }


    // await sleep(1500);

    try {

        const resp = await fetch(
            `${ BASE_URL }/issues?${params}`,
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