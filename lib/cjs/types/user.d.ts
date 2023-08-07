import AvatarsModel from "./models/avatars-model";
import UserPackageDetailsModel from "./models/user-package-details-model";
export default class User {
    private baseUrl;
    private headers;
    private username;
    private fullData;
    /**
     * @param {string} username The npm username of the required user
     * @returns {User} User class with all functionality
     */
    constructor(username: string);
    /**
     * @returns {JSON} JSON object consist all data from npm user page
     */
    rawData(): Promise<any>;
    /**
     * @returns {string} The user type definition by npm
     */
    type(): string | Promise<string>;
    /**
     * @returns {string} The user name on npm
     */
    name(): string | Promise<string>;
    /**
     * @returns {boolean} 'true' if the user is deleted
     */
    isDeleted(): boolean | Promise<boolean>;
    /**
     * @returns {string} The user description paragraph on npm
     */
    description(): string | Promise<string>;
    /**
     * @returns {AvatarsModel} An object with links all the existing avatar images sizes.
     */
    avatars(): AvatarsModel | Promise<AvatarsModel>;
    /**
     * @returns {string} Avatar image link by selected size.
     */
    avatar: {
        /**
         * @returns {string} Link to small avatar image.
         */
        small: () => string | Promise<string>;
        /**
         * @returns {string} Link to medium avatar image.
         */
        medium: () => string | Promise<string>;
        /**
         * @returns {string} Link to large avatar image.
         */
        large: () => string | Promise<string>;
    };
    /**
     * @returns {string} Account creation date.
     */
    createdDate(): string | Promise<string>;
    /**
     * @returns {string} Last date of updating the account.
     */
    updatedDate(): string | Promise<string>;
    /**
     * @returns {number} User id on npm.
     */
    id(): number | Promise<number>;
    info: {
        /**
         * @returns {boolean} 'true' if the user associate github account to his npm profile
         */
        isGithubAccountConnected: () => boolean | Promise<boolean>;
        /**
         * @returns {boolean} 'true' if the user associate twitter account to his npm profile
         */
        isTwitterAccountConnected: () => boolean | Promise<boolean>;
        /**
         * @returns {string} associated github username
         */
        githubAccount: () => string | Promise<string>;
        /**
         * @returns {string} associated twitter username
         */
        twitterAccount: () => string | Promise<string>;
        /**
         * @returns {string} The full name provided by the user
         */
        fullName: () => string | Promise<string> | null;
        /**
         * @returns {string} The email provided by the user
         */
        email: () => string | Promise<string> | null;
    };
    private userPackagesData;
    packages: {
        /**
         * @returns {number} Number of all packages owned by the user
         */
        totalNumber: () => number | Promise<number>;
        /**
         * @returns {UserPackageDetailsModel[]} Array of all the packages owned by the user with their main info
         */
        listAll: () => Promise<UserPackageDetailsModel[]>;
    };
    orgs: {
        /**
         * @returns {number} Number of all organizations the user is associated with
         */
        totalNumber: () => number | Promise<number>;
        /**
         * @returns {UserPackageDetailsModel[]} Array of all the organizations the user is associated with, with their main info
         */
        listAll: () => any[] | Promise<any[]>;
    };
}
