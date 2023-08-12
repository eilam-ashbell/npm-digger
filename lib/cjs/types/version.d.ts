import DistModel from "./models/dist-model";
import NpmPersonModel from "./models/npm-person-model";
import PersonModel from "./models/npm-person-model";
import RepoModel from "./models/repo-model";
export default class Version {
    private baseUrl;
    private packageName;
    private packageVersion;
    private fullData;
    /**
     * @param {string} packageName The npm package name (with scope if exist)
     * @returns {Version} Version class with all functionality
     */
    constructor(packageName: string, packageVersion?: string);
    /**
     * @returns {JSON} JSON object consist all data of specified version or latest version of a package
     */
    data(): Promise<any>;
    /**
     * @returns {string} The name of package
     */
    name(): string | Promise<string>;
    /**
     * @returns {string} The version of the package
     */
    version(): string | Promise<string>;
    /**
     * @returns {string} The description of the package
     */
    description(): string | Promise<string>;
    /**
     * @returns {PersonModel} The author data
     */
    author(): PersonModel | Promise<PersonModel>;
    /**
     * @returns {PersonModel[]} List of contributors of the package
     */
    contributors(): PersonModel[] | Promise<PersonModel[]>;
    /**
     * @returns {string[]} List of keywords of the package
     */
    keywords(): string[] | Promise<string[]>;
    /**
     * @returns {Record<string, string>} the node engines required for this version to run, if specified
     */
    engines(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {Record<string, string>} all scripts defined on the package jason file of the package
     */
    scripts(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {string} Id of the package on npm (A.K.A packageName@PackageVersion)
     */
    id(): string | Promise<string>;
    /**
     * @returns {string} the version of node used to publish this version
     */
    nodeVersion(): string | Promise<string>;
    /**
     * @returns {string} the version of the npm client used to publish this
     */
    npmVersion(): string | Promise<string>;
    /**
     * @returns {DistModel} Dist object
     */
    dist(): DistModel | Promise<DistModel>;
    /**
     * @returns {Record<string, string>} an array of directories included by this version
     */
    directories(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {string} the package's entry point (e.g., index.js or main.js)
     */
    main(): string | Promise<string>;
    /**
     * @returns {string} the SPDX identifier of the package's license
     */
    license(): string | Promise<string>;
    /**
     * @returns {RepoModel} as given in package.json, for the latest version
     */
    repository(): RepoModel | Promise<RepoModel>;
    /**
     * @returns {string} url for bugs reporting
     */
    bugs(): string | Promise<string>;
    /**
     * @returns {string} url of the homepage of the package
     */
    homepage(): string | Promise<string>;
    /**
     * @returns {Record<string, string>} a mapping of bin commands to set up for this version
     */
    bin(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {Record<string, string>} a mapping of other packages this version depends on to the required semver ranges
     */
    dependencies(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {Record<string, string>} a mapping of package names to the required semver ranges of peer dependencies
     */
    peerDependencies(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {Record<string, string>} a mapping of package names to the required semver ranges of development dependencies
     */
    devDependencies(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {Record<string, string>} an object mapping package names to the required semver ranges of optional dependencies
     */
    optionalDependencies(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {Record<string, string>}
     */
    resolutions(): Record<string, string> | Promise<Record<string, string>>;
    /**
     * @returns {string}
     */
    gitHead(): string | Promise<string>;
    /**
     * @returns {NpmPersonModel[]} list of the npm usernames of the people with permission to write to that package
     */
    maintainers(): NpmPersonModel[] | Promise<NpmPersonModel[]>;
    /**
     * @returns {NpmPersonModel} the account that did the publishing for that version
     */
    npmUser(): NpmPersonModel | Promise<NpmPersonModel>;
    /**
     * @returns {boolean} true if this version is known to have a shrinkwrap that must be used to install it; false if this version is known not
     */
    hasShrinkwrap(): boolean | Promise<boolean>;
}
