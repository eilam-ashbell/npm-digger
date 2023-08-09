import DistTagsModel from "./models/dist-tags-model";
import DownloadsModel from "./models/downloads-model";
import NpmPackageVersionDataModel from "./models/npm-package-version-data-model";
import NpmPersonModel from "./models/npm-person-model";
import UserPackageDetailsModel from "./models/user-package-details-model";
import PackageVersionsOverviewModel from "./models/package-versions-overview-model";
import Downloads from "./downloads";
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
     * @returns {NpmPersonModel[]} npm username list of maintainers
     */
    maintainers(): NpmPersonModel[] | Promise<NpmPersonModel[]>;
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
    /**
     * @returns {string} URL for package page on npm
     */
    npmUrl(): string | Promise<string>;
    latestVersion: {
        /**
         * @returns {NpmPackageVersionDataModel} main data objects of the latest version of the package
         */
        data: () => NpmPackageVersionDataModel | Promise<NpmPackageVersionDataModel>;
        author: () => NpmPersonModel | Promise<NpmPersonModel>;
        description: () => string | Promise<string>;
        homepage: () => string | Promise<string>;
        repository: () => string | Promise<string>;
        keywords: () => string[] | Promise<string[]>;
        maintainers: () => NpmPersonModel[] | Promise<NpmPersonModel[]>;
        license: () => string | Promise<string>;
        version: () => string | Promise<string>;
        dependencies: () => Record<string, string> | Promise<Record<string, string>> | undefined;
        devDependencies: () => Record<string, string> | Promise<Record<string, string>> | undefined;
    };
    /**
     * @returns {boolean} 'true' if package is private
     */
    isPrivate(): boolean | Promise<boolean>;
    /**
     * @returns {boolean} 'true' if security placeholder was published for this package
     */
    isSecurityPlaceholder(): boolean | Promise<boolean>;
    /**
     * @returns {string} returns the data of the readme file
     */
    readme(): string | Promise<string>;
    /**
     * @returns {NpmPersonModel} returns package author data
     */
    author(): NpmPersonModel | Promise<NpmPersonModel>;
    /**
     * @returns {string} returns package description data
     */
    description(): string | Promise<string>;
    /**
     * @returns {string} returns package homepage url
     */
    homepage(): string | Promise<string>;
    /**
     * @returns {string} returns package repository url
     */
    repository(): string | Promise<string>;
    /**
     * @returns {string[]} returns package keywords
     */
    keywords(): string[] | Promise<string[]>;
    /**
     * @returns {string} returns package license
     */
    license(): string | Promise<string>;
    /**
     * @returns {string} returns package current version
     */
    currentVersion(): string | Promise<string>;
    /**
     * @returns {PackageVersionsOverviewModel[]} returns package list of versions with key data
     */
    versions(): PackageVersionsOverviewModel[] | Promise<PackageVersionsOverviewModel[]>;
    /**
     * @returns {PackageVersionsOverviewModel[]} returns package list deprecated versions
     */
    deprecations(): string[] | Promise<string[]>;
    downloads: Downloads;
}
