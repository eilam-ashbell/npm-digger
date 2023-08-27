import DistModel from "./models/dist-model";
import NpmFullVersionModel from "./models/npm-full-version-model";
import NpmPersonModel from "./models/npm-person-model";
import PersonModel from "./models/npm-person-model";
import ProvenanceModel from "./models/provenance-model";
import RepoModel from "./models/repo-model";
import Provenance from "./provenance";

export default class Version {
    private baseUrl: string;
    // private headers: Headers;
    private packageName: string;
    private packageVersion: string;
    private fullData: NpmFullVersionModel | undefined;

    /**
     * @param {string} packageName The npm package name (with scope if exist)
     * @param {string} packageVersion The required  package version
     * @returns {Version} Version class with all functionality
     */
    constructor(packageName: string, packageVersion: string) {
        if (!packageName) {
            throw new Error("Package name is required");
        }
        this.packageName = packageName;
        if (packageVersion) {
            this.packageVersion = packageVersion;
            this.baseUrl = `https://registry.npmjs.org/${packageName}/${packageVersion}`;
        } else {
            this.baseUrl = `https://registry.npmjs.org/${packageName}/latest`;
        }
        this.provenance = new Provenance(packageName, packageVersion)        
    }

    public provenance: Provenance;
    /**
     * @returns {JSON} JSON object consist all data of specified version or latest version of a package
     */
    public async data() {
        try {
            // get data from npm
            const response = await fetch(this.baseUrl, {
                method: "GET",
            });
            // parse data
            const data = await response.json();
            // assign to higher scope variable for reusing
            this.fullData = data;
            // return the data as JSON
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @returns {string} The name of package
     */
    public name(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.name
            : this.data()
                  .then((res) => {
                      return res.name;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {string} The version of the package
     */
    public version(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.version
            : this.data()
                  .then((res) => {
                      return res.version;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {string} The description of the package
     */
    public description(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.description
            : this.data()
                  .then((res) => {
                      return res.description;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {PersonModel} The author data
     */
    public author(): PersonModel | Promise<PersonModel> {
        return this.fullData !== undefined
            ? this.fullData.author
            : this.data()
                  .then((res) => {
                      return res.author;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {PersonModel[]} List of contributors of the package
     */
    public contributors(): PersonModel[] | Promise<PersonModel[]> {
        return this.fullData !== undefined
            ? this.fullData.contributors
            : this.data()
                  .then((res) => {
                      return res.contributors;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {string[]} List of keywords of the package
     */
    public keywords(): string[] | Promise<string[]> {
        return this.fullData !== undefined
            ? this.fullData.keywords
            : this.data()
                  .then((res) => {
                      return res.keywords;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {Record<string, string>} the node engines required for this version to run, if specified
     */
    public engines(): Record<string, string> | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.engines
            : this.data()
                  .then((res) => {
                      return res.engines;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {Record<string, string>} all scripts defined on the package jason file of the package
     */
    public scripts(): Record<string, string> | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.scripts
            : this.data()
                  .then((res) => {
                      return res.scripts;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {string} Id of the package on npm (A.K.A packageName@PackageVersion)
     */
    public id(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData._id
            : this.data()
                  .then((res) => {
                      return res._id;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {string} the version of node used to publish this version
     */
    public nodeVersion(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData._nodeVersion
            : this.data()
                  .then((res) => {
                      return res._nodeVersion;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} the version of the npm client used to publish this
     */
    public npmVersion(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData._npmVersion
            : this.data()
                  .then((res) => {
                      return res._npmVersion;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {DistModel} Dist object
     */
    public dist(): DistModel | Promise<DistModel> {
        return this.fullData !== undefined
            ? this.fullData.dist
            : this.data()
                  .then((res) => {
                      return res.dist;
                  })
                  .catch((err) => console.log(err));
    }

        /**
     * @returns {string} url for tarball file
     */
        public tarball(): string | Promise<string> {
            return this.fullData !== undefined
                ? this.fullData.dist.tarball
                : this.data()
                      .then((res) => {
                          return res.dist.tarball;
                      })
                      .catch((err) => console.log(err));
        }

    /**
     * @returns {Record<string, string>} an array of directories included by this version
     */
    public directories():
        | Record<string, string>
        | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.directories
            : this.data()
                  .then((res) => {
                      return res.directories;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} the package's entry point (e.g., index.js or main.js)
     */
    public main(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.main
            : this.data()
                  .then((res) => {
                      return res.main;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} the SPDX identifier of the package's license
     */
    public license(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.license
            : this.data()
                  .then((res) => {
                      return res.license;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {RepoModel} as given in package.json, for the latest version
     */
    public repository(): RepoModel | Promise<RepoModel> {
        return this.fullData !== undefined
            ? this.fullData.repository
            : this.data()
                  .then((res) => {
                      return res.repository;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} url for bugs reporting
     */
    public bugs(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.bugs.url
            : this.data()
                  .then((res) => {
                      return res.bugs.url;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} url of the homepage of the package
     */
    public homepage(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.homepage
            : this.data()
                  .then((res) => {
                      return res.homepage;
                  })
                  .catch((err) => console.log(err));
    }
    /**
     * @returns {Record<string, string>} a mapping of bin commands to set up for this version
     */
    public bin(): Record<string, string> | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.bin
            : this.data()
                  .then((res) => {
                      return res.bin;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {Record<string, string>} a mapping of other packages this version depends on to the required semver ranges
     */
    public dependencies():
        | Record<string, string>
        | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.dependencies
            : this.data()
                  .then((res) => {
                      return res.dependencies;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {Record<string, string>} a mapping of package names to the required semver ranges of peer dependencies
     */
    public peerDependencies():
        | Record<string, string>
        | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.peerDependencies
            : this.data()
                  .then((res) => {
                      return res.peerDependencies;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {Record<string, string>} a mapping of package names to the required semver ranges of development dependencies
     */
    public devDependencies():
        | Record<string, string>
        | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.devDependencies
            : this.data()
                  .then((res) => {
                      return res.devDependencies;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {Record<string, string>} an object mapping package names to the required semver ranges of optional dependencies
     */
    public optionalDependencies():
        | Record<string, string>
        | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.optionalDependencies
            : this.data()
                  .then((res) => {
                      return res.optionalDependencies;
                  })
                  .catch((err) => console.log(err));
    }

    // todo: fill in description
    /**
     * @returns {Record<string, string>}
     */
    public resolutions():
        | Record<string, string>
        | Promise<Record<string, string>> {
        return this.fullData !== undefined
            ? this.fullData.resolutions
            : this.data()
                  .then((res) => {
                      return res.resolutions;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string}
     */
    public gitHead(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.gitHead
            : this.data()
                  .then((res) => {
                      return res.gitHead;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {NpmPersonModel[]} list of the npm usernames of the people with permission to write to that package
     */
    public maintainers(): NpmPersonModel[] | Promise<NpmPersonModel[]> {
        return this.fullData !== undefined
            ? this.fullData.maintainers
            : this.data()
                  .then((res) => {
                      return res.maintainers;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {NpmPersonModel} the account that did the publishing for that version
     */
    public npmUser(): NpmPersonModel | Promise<NpmPersonModel> {
        return this.fullData !== undefined
            ? this.fullData._npmUser
            : this.data()
                  .then((res) => {
                      return res._npmUser;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {boolean} true if this version is known to have a shrinkwrap that must be used to install it; false if this version is known not
     */
    public hasShrinkwrap(): boolean | Promise<boolean> {
        return this.fullData !== undefined
            ? this.fullData._hasShrinkwrap
            : this.data()
                  .then((res) => {
                      return res._hasShrinkwrap;
                  })
                  .catch((err) => console.log(err));
    }
}
