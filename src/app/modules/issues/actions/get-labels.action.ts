
import { sleep } from "@helpers/sleep";
import { GitHubLabelResponse } from "../interfaces";
import { environment } from "@environments/environment";


const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getLabels = async ():Promise<GitHubLabelResponse[]> => {

     //await sleep(1500);

    try {

        const resp = await fetch(
            `${ BASE_URL }/labels`,
            {
                headers: {
                    Authorization: `Bearer ${ GITHUB_TOKEN }`
                }
            }
        )

        if ( !resp.ok ) throw "Response error to get labels";

        const labels: GitHubLabelResponse[] = await resp.json();

        return labels;

    } catch (error) {
        throw "Can't load labels"
    }

}