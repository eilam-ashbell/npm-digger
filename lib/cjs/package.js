"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const downloads_1 = __importDefault(require("./downloads"));
class Package {
    constructor(packageName) {
        this.lastPublish = {
            /**
             * @returns {string} npm username of the maintainer who publish the last release
             */
            maintainer: () => {
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
            time: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.capsule.lastPublish.time
                    : this.page()
                        .then((res) => {
                        return res.capsule.lastPublish.time;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.types = {
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
            entries: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.capsule.types.typescript
                    : this.page()
                        .then((res) => {
                        return res.capsule.types.typescript;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.dependents = {
            /**
             * @returns {number} total number of dependents packages
             */
            count: () => {
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
            listAll: () => {
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
        this.latestVersion = {
            /**
             * @returns {NpmPackageVersionDataModel} main data objects of the latest version of the package
             */
            data: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion
                    : this.page()
                        .then((res) => {
                        return res.packageVersion;
                    })
                        .catch((err) => console.log(err));
            },
            author: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.author
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.author;
                    })
                        .catch((err) => console.log(err));
            },
            description: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.description
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.description;
                    })
                        .catch((err) => console.log(err));
            },
            homepage: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.homepage
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.homepage;
                    })
                        .catch((err) => console.log(err));
            },
            repository: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.repository
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.repository;
                    })
                        .catch((err) => console.log(err));
            },
            keywords: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.keywords
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.keywords;
                    })
                        .catch((err) => console.log(err));
            },
            maintainers: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.maintainers
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.maintainers;
                    })
                        .catch((err) => console.log(err));
            },
            license: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.license
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.license;
                    })
                        .catch((err) => console.log(err));
            },
            version: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.version
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.version;
                    })
                        .catch((err) => console.log(err));
            },
            dependencies: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.dependencies
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.dependencies;
                    })
                        .catch((err) => console.log(err));
            },
            devDependencies: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.devDependencies
                    : this.page()
                        .then((res) => {
                        return res.packageVersion.devDependencies;
                    })
                        .catch((err) => console.log(err));
            },
        };
        if (!packageName) {
            throw new Error("Package name is required");
        }
        this.packageName = packageName;
        this.packageApiRoute = `https://registry.npmjs.org/${packageName}`;
        this.packagePageUrl = `https://www.npmjs.com/package/${packageName}`;
        this.headers = new Headers();
        this.headers.append("x-spiferack", "1");
        this.headers.append("content-type", "application/json");
        this.downloads = new downloads_1.default(packageName);
    }
    /**
     * @returns {JSON} JSON object consist all data from npm package page
     */
    page() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.packagePageUrl, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = yield response.json();
                // assign to higher scope variable for reusing
                this.packagePageData = data;
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @returns {JSON} JSON object consist all data from npm package API
     */
    api() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.packageApiRoute, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = yield response.json();
                // assign to higher scope variable for reusing
                this.packageApiData = data;
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getDependents() {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            while (count < 0) {
                // get data from npm
                const response = yield fetch(this.dependentsBaseRoute + `?offset=${count * 36}`, {
                    method: "GET",
                    headers: this.headers,
                });
                const data = (yield response.json());
                this.dependentsList.push(...data.packages);
                data.hasNext ? count++ : (count = -1);
            }
            return this.dependentsList;
        });
    }
    /**
     * @returns {string} Package name (with scope if exist).
     */
    name() {
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
    maintainers() {
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
    distTags() {
        return this.packagePageData !== undefined
            ? this.packagePageData.capsule["dist-tags"]
            : this.page()
                .then((res) => {
                return res.capsule["dist-tags"];
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {DownloadsModel[]} list of last 52 weeks and downloads count for each
     */
    weeklyDownloads() {
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
    githubApiRoute() {
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
    npmUrl() {
        return `https://www.npmjs.com/packages/${this.packageName}`;
    }
    /**
     * @returns {boolean} 'true' if package is private
     */
    isPrivate() {
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
    isSecurityPlaceholder() {
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
    readme() {
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
    author() {
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
    description() {
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
    homepage() {
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
    repository() {
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
    keywords() {
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
    license() {
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
    currentVersion() {
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
    versions() {
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
    deprecations() {
        return this.packagePageData !== undefined
            ? this.packagePageData.packument.deprecations
            : this.page()
                .then((res) => {
                return res.packument.deprecations;
            })
                .catch((err) => console.log(err));
    }
}
exports.default = Package;
