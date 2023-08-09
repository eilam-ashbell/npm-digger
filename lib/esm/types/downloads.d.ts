import DownloadsModel from "./models/downloads-model";
import { NpmPackagePointDownloadsModel, NpmPackageRangesDownloadsModel, NpmPackageVersionsDownloads } from "./models/npm-package-download-model";
import { Period } from "./models/period";
export default class Downloads {
    private packageName;
    private packagePageUrl;
    private headers;
    private downloadsBaseUrl;
    private perVersionBaseUrl;
    constructor(packageName: string);
    /**
     * @returns {DownloadsModel[]} List of the last 52 weeks from today with their download count
     */
    weeklyDownloads(): Promise<DownloadsModel[] | undefined>;
    /**
     * @param {Period | string} period one of Period type options or date string of yyy-mm-dd format
     * @returns {JSON} JSON object consist the total downloads count to a specific date or period
     */
    pointDownload(period: Period | string): Promise<NpmPackagePointDownloadsModel | undefined>;
    /**
     * @param {Period | string} period one of Period type options or date string of yyy-mm-dd:yyy-mm-dd format
     * @returns {JSON} JSON object consist list of downloads count for each day in a range of time
     */
    rangeDownload(period: Period | string): Promise<NpmPackageRangesDownloadsModel | undefined>;
    /**
     * @returns {JSON} JSON object consist all downloads count of the last week for each version (key: version, value: downloads count)
     */
    perVersion(): Promise<NpmPackageVersionsDownloads | undefined>;
}
