import DependentsModel from "./models/dependents-model";
import DistTagsModel from "./models/dist-tags-model";
import DownloadsModel from "./models/downloads-model";
import NpmPackageVersionDataModel from "./models/npm-package-version-data-model";
import NpmPersonModel from "./models/npm-person-model";
import PackageApiModel from "./models/package-api-model";
import PackagePageModel from "./models/package-page-model";
import UserPackageDetailsModel from "./models/user-package-details-model";
import PackageVersionsOverviewModel from "./models/package-versions-overview-model";
import Downloads from "./downloads";

export default class Package {
    private packageName: string;
    private packagePageUrl: string;
    private packageApiRoute: string;
    private dependentsBaseRoute: "https://www.npmjs.com/browse/depended/express";
    private headers: Headers;
    private packagePageData: PackagePageModel;
    private packageApiData: PackageApiModel;
    private dependentsList: UserPackageDetailsModel[];

    constructor(packageName: string) {
        if (!packageName) {
            throw new Error("Package name is required");
        }

        this.packageName = packageName;
        this.packageApiRoute = `https://registry.npmjs.org/${packageName}`;
        this.packagePageUrl = `https://www.npmjs.com/package/${packageName}`;
        this.headers = new Headers();
        this.headers.append("x-spiferack", "1");
        this.headers.append("content-type", "application/json");
        this.downloads = new Downloads(packageName);
    }

    /**
     * @returns {JSON} JSON object consist all data from npm package page
     */
    private async page() {
        try {
            // get data from npm
            const response = await fetch(this.packagePageUrl, {
                method: "GET",
                headers: this.headers,
            });
            // parse data
            const data = await response.json();
            // assign to higher scope variable for reusing
            this.packagePageData = data;
            // return the data as JSON
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @returns {JSON} JSON object consist all data from npm package API
     */
    private async api() {
        try {
            // get data from npm
            const response = await fetch(this.packageApiRoute, {
                method: "GET",
                headers: this.headers,
            });
            // parse data
            const data = await response.json();
            // assign to higher scope variable for reusing
            this.packageApiData = data;
            // return the data as JSON
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    private async getDependents(): Promise<UserPackageDetailsModel[]> {
        let count = 0;
        while (count < 0) {
            // get data from npm
            const response = await fetch(
                this.dependentsBaseRoute + `?offset=${count * 36}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            );
            const data = (await response.json()) as DependentsModel;
            this.dependentsList.push(...data.packages);
            data.hasNext ? count++ : (count = -1);
        }
        return this.dependentsList;
    }

    /**
     * @returns {string} Package name (with scope if exist).
     */
    public name(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.name
            : this.page()
                  .then((res) => {
                      return res.packument.name;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {NpmPersonModel[]} npm username list of maintainers
     */
    public maintainers(): NpmPersonModel[] | Promise<NpmPersonModel[]> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.maintainers
            : this.page()
                  .then((res) => {
                      return res.packument.maintainers;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {DistTagsModel} object includes main tags of the package (key: name, value: tag)
     */
    public distTags(): DistTagsModel | Promise<DistTagsModel> {
        return this.packagePageData !== undefined
            ? this.packagePageData.capsule["dist-tags"]
            : this.page()
                  .then((res) => {
                      return res.capsule["dist-tags"];
                  })
                  .catch((err) => console.log(err));
    }

    public lastPublish = {
        /**
         * @returns {string} npm username of the maintainer who publish the last release
         */
        maintainer: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.capsule.lastPublish.maintainer
                : this.page()
                      .then((res) => {
                          return res.capsule.lastPublish.maintainer;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {string} date and time of last publish
         */
        time: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.capsule.lastPublish.time
                : this.page()
                      .then((res) => {
                          return res.capsule.lastPublish.time;
                      })
                      .catch((err) => console.log(err));
        },
    };

    public types = {
        // /**
        //  * @returns {boolean}
        //  */
        // isBundled: (): boolean | Promise<boolean> => {
        //     return this.packagePageData !== undefined
        //         ? this.packagePageData.capsule.types.typescript.bundled
        //             ? true
        //             : false
        //         : this.page()
        //               .then((res) => {
        //                   return res.capsule.types.typescript.bundled
        //                       ? true
        //                       : false;
        //               })
        //               .catch((err) => console.log(err));
        // },
        // /**
        //  * @returns {boolean}
        //  */
        // isExternal: (): boolean | Promise<boolean> => {
        //     return this.packagePageData !== undefined
        //         ? this.packagePageData.capsule.types.typescript.package
        //             ? true
        //             : false
        //         : this.page()
        //               .then((res) => {
        //                   return res.capsule.types.typescript.package
        //                       ? true
        //                       : false;
        //               })
        //               .catch((err) => console.log(err));
        // },

        /**
         * @returns {Record<string,string>} object of entries for locate types for the package (key: name, value: entry)
         */
        entries: ():
            | Record<string, string>
            | Promise<Record<string, string>> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.capsule.types.typescript
                : this.page()
                      .then((res) => {
                          return res.capsule.types.typescript;
                      })
                      .catch((err) => console.log(err));
        },
    };

    public dependents = {
        /**
         * @returns {number} total number of dependents packages
         */
        count: (): number | Promise<number> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.dependents.dependentsCount
                : this.page()
                      .then((res) => {
                          return res.dependents.dependentsCount;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {UserPackageDetailsModel[]} list of all dependents packages with main details
         */
        listAll: ():
            | UserPackageDetailsModel[]
            | Promise<UserPackageDetailsModel[]> => {
            return this.dependentsList !== undefined
                ? this.dependentsList
                : this.getDependents()
                      .then((res) => {
                          return res;
                      })
                      .catch((err) => {
                          console.log(err);
                          return [];
                      });
        },
    };

    /**
     * @returns {DownloadsModel[]} list of last 52 weeks and downloads count for each
     */
    public weeklyDownloads(): DownloadsModel[] | Promise<DownloadsModel[]> {
        return this.packagePageData !== undefined
            ? this.packagePageData.downloads
            : this.page()
                  .then((res) => {
                      return res.downloads;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} main route for github API of the package repo
     */
    public githubApiRoute(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.ghapi
            : this.page()
                  .then((res) => {
                      return res.ghapi;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} URL for package page on npm
     */
    public npmUrl(): string | Promise<string> {
        return `https://www.npmjs.com/packages/${this.packageName}`;
    }

    public latestVersion = {
        /**
         * @returns {NpmPackageVersionDataModel} main data objects of the latest version of the package
         */
        data: ():
            | NpmPackageVersionDataModel
            | Promise<NpmPackageVersionDataModel> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion
                : this.page()
                      .then((res) => {
                          return res.packageVersion;
                      })
                      .catch((err) => console.log(err));
        },
        author: (): NpmPersonModel | Promise<NpmPersonModel> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.author
                : this.page()
                      .then((res) => {
                          return res.packageVersion.author;
                      })
                      .catch((err) => console.log(err));
        },
        description: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.description
                : this.page()
                      .then((res) => {
                          return res.packageVersion.description;
                      })
                      .catch((err) => console.log(err));
        },
        homepage: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.homepage
                : this.page()
                      .then((res) => {
                          return res.packageVersion.homepage;
                      })
                      .catch((err) => console.log(err));
        },
        repository: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.repository
                : this.page()
                      .then((res) => {
                          return res.packageVersion.repository;
                      })
                      .catch((err) => console.log(err));
        },
        keywords: (): string[] | Promise<string[]> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.keywords
                : this.page()
                      .then((res) => {
                          return res.packageVersion.keywords;
                      })
                      .catch((err) => console.log(err));
        },
        maintainers: (): NpmPersonModel[] | Promise<NpmPersonModel[]> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.maintainers
                : this.page()
                      .then((res) => {
                          return res.packageVersion.maintainers;
                      })
                      .catch((err) => console.log(err));
        },
        license: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.license
                : this.page()
                      .then((res) => {
                          return res.packageVersion.license;
                      })
                      .catch((err) => console.log(err));
        },
        version: (): string | Promise<string> => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.version
                : this.page()
                      .then((res) => {
                          return res.packageVersion.version;
                      })
                      .catch((err) => console.log(err));
        },
        dependencies: ():
            | Record<string, string>
            | Promise<Record<string, string>>
            | undefined => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.dependencies
                : this.page()
                      .then((res) => {
                          return res.packageVersion.dependencies;
                      })
                      .catch((err) => console.log(err));
        },
        devDependencies: ():
            | Record<string, string>
            | Promise<Record<string, string>>
            | undefined => {
            return this.packagePageData !== undefined
                ? this.packagePageData.packageVersion.devDependencies
                : this.page()
                      .then((res) => {
                          return res.packageVersion.devDependencies;
                      })
                      .catch((err) => console.log(err));
        },
    };

    /**
     * @returns {boolean} 'true' if package is private
     */
    public isPrivate(): boolean | Promise<boolean> {
        return this.packagePageData !== undefined
            ? this.packagePageData.private
            : this.page()
                  .then((res) => {
                      return res.private;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {boolean} 'true' if security placeholder was published for this package
     */
    public isSecurityPlaceholder(): boolean | Promise<boolean> {
        return this.packagePageData !== undefined
            ? this.packagePageData.isSecurityPlaceholder
            : this.page()
                  .then((res) => {
                      return res.isSecurityPlaceholder;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} returns the data of the readme file
     */
    public readme(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.readme.data
            : this.page()
                  .then((res) => {
                      return res.readme.data;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {NpmPersonModel} returns package author data
     */
    public author(): NpmPersonModel | Promise<NpmPersonModel> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.author
            : this.page()
                  .then((res) => {
                      return res.packument.author;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} returns package description data
     */
    public description(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.description
            : this.page()
                  .then((res) => {
                      return res.packument.description;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} returns package homepage url
     */
    public homepage(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.homepage
            : this.page()
                  .then((res) => {
                      return res.packument.homepage;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} returns package repository url
     */
    public repository(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.repository
            : this.page()
                  .then((res) => {
                      return res.packument.repository;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string[]} returns package keywords
     */
    public keywords(): string[] | Promise<string[]> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.keywords
            : this.page()
                  .then((res) => {
                      return res.packument.keywords;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} returns package license
     */
    public license(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.license
            : this.page()
                  .then((res) => {
                      return res.packument.license;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} returns package current version
     */
    public currentVersion(): string | Promise<string> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.version
            : this.page()
                  .then((res) => {
                      return res.packument.version;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {PackageVersionsOverviewModel[]} returns package list of versions with key data
     */
    public versions():
        | PackageVersionsOverviewModel[]
        | Promise<PackageVersionsOverviewModel[]> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.versions
            : this.page()
                  .then((res) => {
                      return res.packument.versions;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {PackageVersionsOverviewModel[]} returns package list deprecated versions
     */
    public deprecations(): string[] | Promise<string[]> {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.deprecations
            : this.page()
                  .then((res) => {
                      return res.packument.deprecations;
                  })
                  .catch((err) => console.log(err));
    }

    public downloads: Downloads;
}
