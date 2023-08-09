import DistTagsModel from "./models/dist-tags-model";
import DownloadsModel from "./models/downloads-model";
import UserPackageDetailsModel from "./models/user-package-details-model";
export default class Package {
    private packageName;
    private packagePageUrl;
    private packageApiRoute;
    private dependentsBaseRoute;
    private headers;
    private packagePageData;
    private packageApiData;
    private dependentsList;
    constructor(packageName: string);
    /**
     * @returns {JSON} JSON object consist all data from npm package page
     */
    private page;
    /**
     * @returns {JSON} JSON object consist all data from npm package API
     */
    private api;
    private getDependents;
    /**
     * @returns {string} Package name (with scope if exist).
     */
    name(): string | Promise<string>;
    /**
     * @returns {string[]} npm username list of maintainers
     */
    maintainers(): string[] | Promise<string[]>;
    /**
     * @returns {DistTagsModel} object includes main tags of the package (key: name, value: tag)
     */
    distTags(): DistTagsModel | Promise<DistTagsModel>;
    lastPublish: {
        /**
         * @returns {string} npm username of the maintainer who publish the last release
         */
        maintainer: () => string | Promise<string>;
        /**
         * @returns {string} date and time of last publish
         */
        time: () => string | Promise<string>;
    };
    types: {
        /**
         * @returns {Record<string,string>} object of entries for locate types for the package (key: name, value: entry)
         */
        entries: () => Record<string, string> | Promise<Record<string, string>>;
    };
    dependents: {
        /**
         * @returns {number} total number of dependents packages
         */
        count: () => number | Promise<number>;
        /**
         * @returns {UserPackageDetailsModel[]} list of all dependents packages with main details
         */
        listAll: () => UserPackageDetailsModel[] | Promise<UserPackageDetailsModel[]>;
    };
    /**
     * @returns {DownloadsModel[]} list of last 52 weeks and downloads count for each
     */
    weeklyDownloads(): DownloadsModel[] | Promise<DownloadsModel[]>;
    /**
     * @returns {string} main route for github API of the package repo
     */
    githubApiRoute(): string | Promise<string>;
}
