import DistTagsModel from "./models/dist-tags-model";
import NpmPackageVersionDataModel from "./models/npm-package-version-data-model";
import NpmPersonModel from "./models/npm-person-model";
import UserPackageDetailsModel from "./models/user-package-details-model";
import Downloads from "./downloads";
import NpmOverviewVersionModel from "./models/npm-overview-version-model";
import { FullPackageTimeModel } from "./models/package-time-model";
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
    downloads: Downloads;
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
    name(): string | Promise<string | undefined | void>;
    /**
     * @returns {NpmPersonModel[]} npm username list of maintainers
     */
    maintainers(): NpmPersonModel[] | Promise<NpmPersonModel[] | undefined | void>;
    /**
     * @returns {DistTagsModel} object includes main tags of the package (key: name, value: tag)
     */
    distTags(): DistTagsModel | Promise<DistTagsModel | undefined | void>;
    lastPublish: {
        /**
         * @returns {string} npm username of the maintainer who publish the last release
         */
        maintainer: () => string | Promise<string | undefined | void>;
        /**
         * @returns {string} date and time of last publish
         */
        time: () => string | Promise<string | undefined | void>;
    };
    types: {
        /**
         * @returns {boolean} 'true if types are bundled in the package
         */
        isBundled: () => boolean | Promise<boolean | undefined | void>;
        /**
         * @returns {boolean}  'true if types are in external package
         */
        isExternal: () => boolean | Promise<boolean | undefined | void>;
        /**
         * @returns {Record<string,string>} object of entries for locate types for the package (key: name, value: entry)
         */
        entries: () => Record<string, string> | Promise<Record<string, string> | undefined | void>;
    };
    dependents: {
        /**
         * @returns {number} total number of dependents packages
         */
        count: () => number | Promise<number | undefined | void>;
        /**
         * @returns {UserPackageDetailsModel[]} list of all dependents packages with main details
         */
        listAll: () => UserPackageDetailsModel[] | Promise<UserPackageDetailsModel[] | undefined | void>;
    };
    /**
     * @returns {string} main route for github API of the package repo
     */
    githubApiRoute(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} URL for package page on npm
     */
    npmUrl(): string | Promise<string>;
    latestVersion: {
        /**
         * @returns {NpmPackageVersionDataModel} main data objects of the latest version of the package
         */
        data: () => NpmPackageVersionDataModel | Promise<NpmPackageVersionDataModel | undefined | void>;
        author: () => NpmPersonModel | Promise<NpmPersonModel | undefined | void>;
        description: () => string | Promise<string | undefined | void>;
        homepage: () => string | Promise<string | undefined | void>;
        repository: () => string | Promise<string | undefined | void>;
        keywords: () => string[] | Promise<string[] | undefined | void>;
        maintainers: () => NpmPersonModel[] | Promise<NpmPersonModel[] | undefined | void>;
        license: () => string | Promise<string | undefined | void>;
        version: () => string | Promise<string | undefined | void>;
        dependencies: () => Record<string, string> | Promise<Record<string, string> | undefined | void> | undefined;
        devDependencies: () => Record<string, string> | Promise<Record<string, string> | undefined | void> | undefined;
    };
    /**
     * @returns {boolean} 'true' if package is private
     */
    isPrivate(): boolean | Promise<boolean | undefined | void>;
    /**
     * @returns {boolean} 'true' if security placeholder was published for this package
     */
    isSecurityPlaceholder(): boolean | Promise<boolean | undefined | void>;
    /**
     * @returns {string} returns the data of the readme file
     */
    readme(): string | Promise<string | undefined | void>;
    /**
     * @returns {NpmPersonModel} returns package author data
     */
    author(): NpmPersonModel | Promise<NpmPersonModel | undefined | void>;
    /**
     * @returns {string} returns package description data
     */
    description(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} returns package homepage url
     */
    homepage(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} returns package repository url
     */
    repository(): string | Promise<string | undefined | void>;
    /**
     * @returns {string[]} returns package keywords
     */
    keywords(): string[] | Promise<string[] | undefined | void>;
    /**
     * @returns {string} returns package license
     */
    license(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} returns package current version
     */
    currentVersion(): string | Promise<string | undefined | void>;
    /**
     * @returns {Record<string, NpmOverviewVersionModel>} returns JSON object with versions data (key: version, value: data about the version)
     */
    versions: {
        data: () => Record<string, NpmOverviewVersionModel> | Promise<Record<string, NpmOverviewVersionModel> | undefined | void>;
        /**
         * @returns {string[]} returns package list deprecated versions
         */
        deprecations: () => string[] | Promise<string[] | undefined | void>;
        /**
         * @returns {FullPackageTimeModel} returns a JSON object with all releases times (key: release tag, value: date-time string)
         */
        releaseDates: () => FullPackageTimeModel | Promise<FullPackageTimeModel | undefined | void>;
    };
    /**
     * @returns {string} returns the package name, used as an ID in CouchDB
     */
    id(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} returns the revision number of this version of the document in CouchDB
     */
    rev(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} returns time string of package creation
     */
    createdTime(): string | Promise<string | undefined | void>;
    /**
     * @returns {string} returns time string of package last modify time
     */
    lastModified(): string | Promise<string | undefined | void>;
    stars: {
        /**
         * @returns {number} returns the number of users who star this package
         */
        count: () => number | Promise<number | undefined | void>;
        /**
         * @returns {string[]} returns a list of users who star this package
         */
        usersList: () => string[] | Promise<string[] | undefined | void>;
    };
    /**
     * @returns {NpmPersonModel[]} returns a list of contributors of this package
     */
    contributors(): NpmPersonModel[] | Promise<NpmPersonModel[] | undefined | void>;
    /**
     * @returns {Record<string, string>} returns an object with available URLs for bug report
     */
    bugsReport(): Record<string, string> | Promise<Record<string, string> | undefined | void>;
}
