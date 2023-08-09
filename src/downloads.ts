import DownloadsModel from "./models/downloads-model";
import {
    NpmPackagePointDownloadsModel,
    NpmPackageRangesDownloadsModel,
    NpmPackageVersionsDownloads,
} from "./models/npm-package-download-model";
import PackagePageModel from "./models/package-page-model";
import { Period } from "./models/period";

export default class Downloads {
    private packageName: string;
    private packagePageUrl: string;
    private headers: Headers;
    // private packagePageData: PackagePageModel;
    private downloadsBaseUrl: string;
    private perVersionBaseUrl: string;

    constructor(packageName: string) {
        if (!packageName) {
            throw new Error("Package name is required");
        }
        this.packageName = packageName;
        this.packagePageUrl = `https://www.npmjs.com/package/${packageName}`;
        this.headers = new Headers();
        this.headers.append("x-spiferack", "1");
        this.headers.append("content-type", "application/json");
        this.downloadsBaseUrl = "https://api.npmjs.org/downloads";
        this.perVersionBaseUrl = `https://api.npmjs.org/versions/${packageName}/last-week`;
    }

    /**
     * @returns {DownloadsModel[]} List of the last 52 weeks from today with their download count
     */
    public async weeklyDownloads(): Promise<DownloadsModel[] | undefined> {
        try {
            // get data from npm
            const response = await fetch(this.packagePageUrl, {
                method: "GET",
                headers: this.headers,
            });
            // parse data
            const data = (await response.json()) as PackagePageModel;
            const weeklyDownloads = data.downloads;
            // return the data as JSON
            return weeklyDownloads as DownloadsModel[];
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @param {Period | string} period one of Period type options or date string of yyy-mm-dd format
     * @returns {JSON} JSON object consist the total downloads count to a specific date or period
     */
    public async pointDownload(
        period: Period | string
    ): Promise<NpmPackagePointDownloadsModel | undefined> {
        try {
            // get data from npm
            const response = await fetch(
                `${this.downloadsBaseUrl}/point/${period}/${this.packageName}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            );
            // parse data
            const data = await response.json();
            // return the data as JSON
            return data as NpmPackagePointDownloadsModel;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @param {Period | string} period one of Period type options or date string of yyy-mm-dd:yyy-mm-dd format
     * @returns {JSON} JSON object consist list of downloads count for each day in a range of time
     */
    public async rangeDownload(
        period: Period | string
    ): Promise<NpmPackageRangesDownloadsModel | undefined> {
        try {
            // get data from npm
            const response = await fetch(
                `${this.downloadsBaseUrl}/range/${period}/${this.packageName}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            );
            // parse data
            const data = await response.json();
            // return the data as JSON
            return data as NpmPackageRangesDownloadsModel;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @returns {JSON} JSON object consist all downloads count of the last week for each version (key: version, value: downloads count)
     */
    public async perVersion(): Promise<
        NpmPackageVersionsDownloads | undefined
    > {
        try {
            // get data from npm
            const response = await fetch(this.perVersionBaseUrl, {
                method: "GET",
                headers: this.headers,
            });
            // parse data
            const data = await response.json();
            // return the data as JSON
            return data as NpmPackageVersionsDownloads;
        } catch (err) {
            console.log(err);
        }
    }
}
