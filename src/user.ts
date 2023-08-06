import AvatarsModel from "./models/avatars-model";
import UserFullDataModel from "./models/user-full-data-model";
import UserPackageDetailsModel from "./models/user-package-details-model";

export class User {
    private baseUrl: string;
    private headers: Headers;
    private username: string;
    private fullData: UserFullDataModel | undefined;

    /**
     * @param {string} username The npm username of the required user
     * @returns {User} User class with all functionality
     */
    constructor(username: string) {
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
    public async rawData() {
        try {
            // get data from npm
            const response = await fetch(this.baseUrl, {
                method: "GET",
                headers: this.headers,
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
     * @returns {string} The user type definition by npm
     */
    public type(): string | Promise<string> {
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
    public name(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.scope.name
            : this.rawData()
                  .then((res) => {
                      return res.scope.name;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {boolean} 'true' if the user is deleted
     */
    public isDeleted(): boolean | Promise<boolean> {
        return this.fullData !== undefined
            ? this.fullData.scope.parent.deleted
            : this.rawData()
                  .then((res) => {
                      return res.scope.parent.deleted;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} The user description paragraph on npm
     */
    public description(): string | Promise<string> {
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
    public avatars(): AvatarsModel | Promise<AvatarsModel> {
        return this.fullData !== undefined
            ? this.fullData.scope.parent.avatars
            : this.rawData()
                  .then((res) => {
                      return res.scope.parent.avatars;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} Avatar image link by selected size.
     */
    public avatar = {
        /**
         * @returns {string} Link to small avatar image.
         */
        small: (): string | Promise<string> => {
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
        medium: (): string | Promise<string> => {
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
        large: (): string | Promise<string> => {
            return this.fullData !== undefined
                ? this.fullData.scope.parent.avatars.large
                : this.rawData()
                      .then((res) => {
                          return res.scope.parent.avatars.large;
                      })
                      .catch((err) => console.log(err));
        },
    };

    /**
     * @returns {string} Account creation date.
     */
    public createdDate(): string | Promise<string> {
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
    public updatedDate(): string | Promise<string> {
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
    public id(): number | Promise<number> {
        return this.fullData !== undefined
            ? this.fullData.scope.id
            : this.rawData()
                  .then((res) => {
                      return res.scope.id;
                  })
                  .catch((err) => console.log(err));
    }

    public info = {
        /**
         * @returns {boolean} 'true' if the user associate github account to his npm profile
         */
        isGithubAccountConnected: (): boolean | Promise<boolean> => {
            return this.fullData !== undefined
                ? this.fullData.scope.resource.githubLegacy
                : this.rawData()
                      .then((res) => {
                          return res.scope.resource.githubLegacy;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {boolean} 'true' if the user associate twitter account to his npm profile
         */
        isTwitterAccountConnected: (): boolean | Promise<boolean> => {
            return this.fullData !== undefined
                ? this.fullData.scope.resource.twitterLegacy
                : this.rawData()
                      .then((res) => {
                          return res.scope.resource.twitterLegacy;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {string} associated github username
         */
        githubAccount: (): string | Promise<string> => {
            return this.fullData !== undefined
                ? this.fullData.scope.resource.github
                : this.rawData()
                      .then((res) => {
                          return res.scope.resource.github;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {string} associated twitter username
         */
        twitterAccount: (): string | Promise<string> => {
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
        fullName: (): string | Promise<string> | null => {
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
        email: (): string | Promise<string> | null => {
            return this.fullData !== undefined
                ? this.fullData.scope.resource.email
                : this.rawData()
                      .then((res) => {
                          return res.scope.resource.email;
                      })
                      .catch((err) => console.log(err));
        },
    };

    // util function to fetch all packages of the user
    private async userPackagesData(): Promise<UserPackageDetailsModel[]> {
        // init objects
        let packagesData: UserPackageDetailsModel[] = [];
        let packageCount = 0;
        let nextUrl = 1;

        // if first fetch did not happened yet -> execute it
        if (this.fullData == undefined) {
            const data = await this.rawData();
        }

        if (this.fullData != undefined) {
            // save first page results
            packagesData.push(...this.fullData.packages.objects);
            // run till packageCount is equal to total number of packages
            while (packageCount < this.fullData?.packages.total) {
                try {
                    // fetch next page
                    const response = await fetch(
                        // 100 is the maximum perPage value
                        this.baseUrl + `?perPage=100&page=${nextUrl}`,
                        {
                            method: "GET",
                            headers: this.headers,
                        }
                    );
                    // parse data
                    const data = await response.json();
                    // save page results
                    packagesData.push(...data.packages.objects);
                    nextUrl++;
                    packageCount = packagesData.length;
                } catch (err) {
                    console.log(err);
                }
            }
        }
        return packagesData;
    }

    public packages = {
        /**
         * @returns {number} Number of all packages owned by the user
         */
        totalNumber: (): number | Promise<number> => {
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
        listAll: (): Promise<UserPackageDetailsModel[]> => {
            return this.userPackagesData();
        },
    };

    public orgs = {
        /**
         * @returns {number} Number of all organizations the user is associated with
         */
        totalNumber: (): number | Promise<number> => {
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
        listAll: (): any[] | Promise<any[]> => {
            return this.fullData !== undefined
                ? this.fullData.orgs.objects
                : this.rawData()
                      .then((res) => {
                          return res.orgs.object;
                      })
                      .catch((err) => console.log(err));
        },
    };
}
