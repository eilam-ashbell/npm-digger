var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class User {
    /**
     * @param {string} username The npm username of the required user
     * @returns {User} User class with all functionality
     */
    constructor(username) {
        /**
         * @returns {string} Avatar image link by selected size.
         */
        this.avatar = {
            /**
             * @returns {string} Link to small avatar image.
             */
            small: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.parent.avatars.small
                    : this.rawData()
                        .then((res) => {
                        return res.scope.parent.avatars.small;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string} Link to medium avatar image.
             */
            medium: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.parent.avatars.medium
                    : this.rawData()
                        .then((res) => {
                        return res.scope.parent.avatars.medium;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string} Link to large avatar image.
             */
            large: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.parent.avatars.large
                    : this.rawData()
                        .then((res) => {
                        return res.scope.parent.avatars.large;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.info = {
            /**
             * @returns {boolean} 'true' if the user associate github account to his npm profile
             */
            isGithubAccountConnected: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.resource.githubLegacy
                        ? true
                        : false
                    : this.rawData()
                        .then((res) => {
                        return res.scope.resource.githubLegacy ? true : false;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {boolean} 'true' if the user associate twitter account to his npm profile
             */
            isTwitterAccountConnected: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.resource.twitterLegacy
                        ? true
                        : false
                    : this.rawData()
                        .then((res) => {
                        return res.scope.resource.twitterLegacy
                            ? true
                            : false;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string} associated github username
             */
            githubAccount: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.resource.github
                    : this.rawData()
                        .then((res) => {
                        return res.scope.resource.github;
                    })
                        .catch((err) => console.log(err));
            },
            // todo: think about links to github and twitter
            // twitterAccount: ():
            //     | Record<string, string | Promise<string>>
            //     | Promise<Record<string, string>>
            //     | null => {
            //     const username =
            //         this.fullData !== undefined
            //             ? this.fullData.scope.resource.twitter
            //             : this.rawData()
            //                   .then((res) => {
            //                       return res.scope.resource.twitter;
            //                   })
            //                   .catch((err) => console.log(err));
            //     return username
            //         ? {
            //               username: username,
            //               link: `https://twitter.com/${username}`,
            //           }
            //         : null;
            // },
            /**
             * @returns {string} associated twitter username
             */
            twitterAccount: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.resource.twitter
                    : this.rawData()
                        .then((res) => {
                        return res.scope.resource.twitter;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string} The full name provided by the user
             */
            fullName: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.resource.fullName
                    : this.rawData()
                        .then((res) => {
                        return res.scope.resource.fullName;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {string} The email provided by the user
             */
            email: () => {
                return this.fullData !== undefined
                    ? this.fullData.scope.resource.email
                    : this.rawData()
                        .then((res) => {
                        return res.scope.resource.email;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.packages = {
            /**
             * @returns {number} Number of all packages owned by the user
             */
            totalNumber: () => {
                return this.fullData !== undefined
                    ? this.fullData.packages.total
                    : this.rawData()
                        .then((res) => {
                        return res.packages.total;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {UserPackageDetailsModel[]} Array of all the packages owned by the user with their main info
             */
            listAll: () => {
                return this.userPackagesData();
            },
        };
        this.orgs = {
            /**
             * @returns {number} Number of all organizations the user is associated with
             */
            totalNumber: () => {
                return this.fullData !== undefined
                    ? this.fullData.orgs.total
                    : this.rawData()
                        .then((res) => {
                        return res.orgs.total;
                    })
                        .catch((err) => console.log(err));
            },
            /**
             * @returns {UserPackageDetailsModel[]} Array of all the organizations the user is associated with, with their main info
             */
            listAll: () => {
                return this.fullData !== undefined
                    ? this.fullData.orgs.objects
                    : this.rawData()
                        .then((res) => {
                        return res.orgs.object;
                    })
                        .catch((err) => console.log(err));
            },
        };
        if (!username) {
            throw new Error("Username is required");
        }
        this.username = username;
        this.baseUrl = `https://www.npmjs.com/~${username}`;
        this.headers = new Headers();
        this.headers.append("x-spiferack", "1");
        this.headers.append("content-type", "application/json");
    }
    /**
     * @returns {JSON} JSON object consist all data from npm user page
     */
    rawData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.baseUrl, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = yield response.json();
                // assign to higher scope variable for reusing
                this.fullData = data;
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @returns {string} The user type definition by npm
     */
    accountType() {
        return this.fullData !== undefined
            ? this.fullData.scope.type
            : this.rawData()
                .then((res) => {
                return res.scope.type;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} The user name on npm
     */
    name() {
        return this.fullData !== undefined
            ? this.fullData.scope.name
            : this.rawData()
                .then((res) => {
                return res.scope.name;
            })
                .catch((err) => console.log(err));
    }
    // todo: find deleted user to validate
    // /**
    //  * @returns {boolean} 'true' if the user is deleted
    //  */
    // public isDeleted(): boolean | Promise<boolean> {
    //     return this.fullData !== undefined
    //         ? this.fullData.scope.parent.deleted
    //         : this.rawData()
    //               .then((res) => {
    //                   return res.scope.parent.deleted;
    //               })
    //               .catch((err) => console.log(err));
    // }
    /**
     * @returns {string} The user description paragraph on npm
     */
    description() {
        return this.fullData !== undefined
            ? this.fullData.scope.parent.description
            : this.rawData()
                .then((res) => {
                return res.scope.parent.description;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {AvatarsModel} An object with links all the existing avatar images sizes.
     */
    avatars() {
        return this.fullData !== undefined
            ? this.fullData.scope.parent.avatars
            : this.rawData()
                .then((res) => {
                return res.scope.parent.avatars;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} Account creation date.
     */
    createdDate() {
        return this.fullData !== undefined
            ? this.fullData.scope.created
            : this.rawData()
                .then((res) => {
                return res.scope.created;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {string} Last date of updating the account.
     */
    updatedDate() {
        return this.fullData !== undefined
            ? this.fullData.scope.updated
            : this.rawData()
                .then((res) => {
                return res.scope.updated;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {number} User id on npm.
     */
    id() {
        return this.fullData !== undefined
            ? this.fullData.scope.id
            : this.rawData()
                .then((res) => {
                return res.scope.id;
            })
                .catch((err) => console.log(err));
    }
    // util function to fetch all packages of the user
    userPackagesData() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // init objects
            let packagesData = [];
            let packageCount = 0;
            let nextUrl = 1;
            // if first fetch did not happened yet -> execute it
            if (this.fullData == undefined) {
                const data = yield this.rawData();
            }
            if (this.fullData != undefined) {
                // save first page results
                packagesData.push(...this.fullData.packages.objects);
                // run till packageCount is equal to total number of packages
                while (packageCount < ((_a = this.fullData) === null || _a === void 0 ? void 0 : _a.packages.total)) {
                    try {
                        // fetch next page
                        const response = yield fetch(
                        // 100 is the maximum perPage value. default is 25.
                        this.baseUrl + `?page=${nextUrl}`, {
                            method: "GET",
                            headers: this.headers,
                        });
                        // parse data
                        const data = yield response.json();
                        // save page results
                        packagesData.push(...data.packages.objects);
                        nextUrl++;
                        packageCount = packagesData.length;
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            return packagesData;
        });
    }
}
