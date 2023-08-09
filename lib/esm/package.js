var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Package {
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
        if (!packageName) {
            throw new Error("Package name is required");
        }
        this.packageName = packageName;
        this.packageApiRoute = `https://registry.npmjs.org/${packageName}`;
        this.packagePageUrl = `https://www.npmjs.com/package/${packageName}`;
        this.headers = new Headers();
        this.headers.append("x-spiferack", "1");
        this.headers.append("content-type", "application/json");
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
            ? this.packagePageData.capsule.name
            : this.page()
                .then((res) => {
                return res.capsule.name;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string[]} npm username list of maintainers
     */
    maintainers() {
        return this.packagePageData !== undefined
            ? this.packagePageData.capsule.maintainers
            : this.page()
                .then((res) => {
                return res.capsule.maintainers;
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
}
