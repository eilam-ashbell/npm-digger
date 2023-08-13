var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Downloads from "./downloads";
export default class Package {
    constructor(packageName) {
        this.dependentsBaseRoute = "https://www.npmjs.com/browse/depended/express";
        this.lastPublish = {
            /**
             * @returns {string} npm username of the maintainer who publish the last release
             */
            maintainer: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.capsule.lastPublish.maintainer
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.capsule.lastPublish.maintainer;
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
                        return res === null || res === void 0 ? void 0 : res.capsule.lastPublish.time;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.types = {
            /**
             * @returns {boolean} 'true if types are bundled in the package
             */
            isBundled: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.capsule.types.typescript.bundled
                        ? true
                        : false
                    : this.page()
                        .then((res) => {
                        return (res === null || res === void 0 ? void 0 : res.capsule.types.typescript.bundled)
                            ? true
                            : false;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {boolean}  'true if types are in external package
             */
            isExternal: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.capsule.types.typescript.package
                        ? true
                        : false
                    : this.page()
                        .then((res) => {
                        return (res === null || res === void 0 ? void 0 : res.capsule.types.typescript.package)
                            ? true
                            : false;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {Record<string,string>} object of entries for locate types for the package (key: name, value: entry)
             */
            entries: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.capsule.types.typescript
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.capsule.types.typescript;
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
                        return res === null || res === void 0 ? void 0 : res.dependents.dependentsCount;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {UserPackageDetailsModel[]} list of all dependents packages with main details
             */
            listAll: () => {
                return this.dependentsList.length !== 0
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
                        return res === null || res === void 0 ? void 0 : res.packageVersion;
                    })
                        .catch((err) => console.log(err));
            },
            author: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.author
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.author;
                    })
                        .catch((err) => console.log(err));
            },
            description: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.description
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.description;
                    })
                        .catch((err) => console.log(err));
            },
            homepage: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.homepage
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.homepage;
                    })
                        .catch((err) => console.log(err));
            },
            repository: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.repository
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.repository;
                    })
                        .catch((err) => console.log(err));
            },
            keywords: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.keywords
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.keywords;
                    })
                        .catch((err) => console.log(err));
            },
            maintainers: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.maintainers
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.maintainers;
                    })
                        .catch((err) => console.log(err));
            },
            license: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.license
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.license;
                    })
                        .catch((err) => console.log(err));
            },
            version: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.version
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.version;
                    })
                        .catch((err) => console.log(err));
            },
            dependencies: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.dependencies
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.dependencies;
                    })
                        .catch((err) => console.log(err));
            },
            devDependencies: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packageVersion.devDependencies
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packageVersion.devDependencies;
                    })
                        .catch((err) => console.log(err));
            },
        };
        /**
         * @returns {Record<string, NpmOverviewVersionModel>} returns JSON object with versions data (key: version, value: data about the version)
         */
        this.versions = {
            data: () => {
                return this.packageApiData !== undefined
                    ? this.packageApiData.versions
                    : this.api()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.versions;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string[]} returns package list deprecated versions
             */
            deprecations: () => {
                return this.packagePageData !== undefined
                    ? this.packagePageData.packument.deprecations
                    : this.page()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.packument.deprecations;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {FullPackageTimeModel} returns a JSON object with all releases times (key: release tag, value: date-time string)
             */
            releaseDates: () => {
                return this.packagePageData !== undefined
                    ? this.packageApiData.time
                    : this.api()
                        .then((res) => {
                        return res === null || res === void 0 ? void 0 : res.time;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.stars = {
            /**
             * @returns {number} returns the number of users who star this package
             */
            count: () => {
                return this.packageApiData !== undefined
                    ? Object.keys(this.packageApiData.users).length
                    : this.api()
                        .then((res) => {
                        return Object.keys(res === null || res === void 0 ? void 0 : res.users).length;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string[]} returns a list of users who star this package
             */
            usersList: () => {
                return this.packageApiData !== undefined
                    ? Object.keys(this.packageApiData.users)
                    : this.api()
                        .then((res) => {
                        return Object.keys(res === null || res === void 0 ? void 0 : res.users);
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
        this.downloads = new Downloads(packageName);
        this.dependentsList = [];
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
            try {
                let count = 0;
                while (count >= 0) {
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
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @returns {string} Package name (with scope if exist).
     */
    name() {
        return this.packageApiData !== undefined
            ? this.packageApiData.name
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.name;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {NpmPersonModel[]} npm username list of maintainers
     */
    maintainers() {
        return this.packageApiData !== undefined
            ? this.packageApiData.maintainers
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.maintainers;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {DistTagsModel} object includes main tags of the package (key: name, value: tag)
     */
    distTags() {
        return this.packageApiData !== undefined
            ? this.packageApiData["dist-tags"]
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res["dist-tags"];
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
                return res === null || res === void 0 ? void 0 : res.ghapi;
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
                return res === null || res === void 0 ? void 0 : res.private;
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
                return res === null || res === void 0 ? void 0 : res.isSecurityPlaceholder;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns the data of the readme file
     */
    readme() {
        return this.packageApiData !== undefined
            ? this.packageApiData.readme
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.readme;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {NpmPersonModel} returns package author data
     */
    author() {
        return this.packageApiData !== undefined
            ? this.packageApiData.author
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.author;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns package description data
     */
    description() {
        return this.packageApiData !== undefined
            ? this.packageApiData.description
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.description;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns package homepage url
     */
    homepage() {
        return this.packageApiData !== undefined
            ? this.packageApiData.homepage
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.homepage;
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
                return res === null || res === void 0 ? void 0 : res.packument.repository;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string[]} returns package keywords
     */
    keywords() {
        return this.packageApiData !== undefined
            ? this.packageApiData.keywords
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.keywords;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns package license
     */
    license() {
        return this.packageApiData !== undefined
            ? this.packageApiData.license
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.license;
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
                return res === null || res === void 0 ? void 0 : res.packument.version;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns the package name, used as an ID in CouchDB
     */
    id() {
        return this.packageApiData !== undefined
            ? this.packageApiData._id
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res._id;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns the revision number of this version of the document in CouchDB
     */
    rev() {
        return this.packageApiData !== undefined
            ? this.packageApiData._rev
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res._rev;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns time string of package creation
     */
    createdDateTime() {
        return this.packageApiData !== undefined
            ? this.packageApiData.time.created
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.time.created;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} returns time string of package last modify time
     */
    lastModified() {
        return this.packageApiData !== undefined
            ? this.packageApiData.time.modified
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.time.modified;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {NpmPersonModel[]} returns a list of contributors of this package
     */
    contributors() {
        return this.packageApiData !== undefined
            ? this.packageApiData.contributors
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.contributors;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {Record<string, string>} returns an object with available URLs for bug report
     */
    bugsReport() {
        return this.packageApiData !== undefined
            ? this.packageApiData.bugs
            : this.api()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.bugs;
            })
                .catch((err) => console.log(err));
    }
}
