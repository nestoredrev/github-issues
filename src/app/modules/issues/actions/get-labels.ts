
import { sleep } from "@helpers/sleep";
import { GitHubLabelResponse } from "../interfaces";


export const getLabels = async ():Promise<GitHubLabelResponse[]> => {

    await sleep(1500);

    try {

        const resp = await fetch(`https://api.github.com/repos/angular/angular/labels`)

        if ( !resp.ok ) throw "Response error to get labels";

        const labels: GitHubLabelResponse[] = await resp.json();
        console.log("🚀 ~ getLabels ~ labels:", labels)

        return labels;

    } catch (error) {
        throw "Can't load labels"
    }

}