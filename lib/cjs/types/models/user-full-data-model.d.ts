import AvatarsModel from "./avatars-model";
import UserPackageDetailsModel from "./user-package-details-model";
export default class UserFullDataModel {
    scope: {
        type: string;
        name: string;
        parent: {
            deleted: boolean;
            name: string;
            description: string;
            tfa_enforced: boolean;
            avatars: AvatarsModel;
            created: string;
            updated: string;
            resource: {
                githubLegacy: boolean;
                twitterLegacy: boolean;
                github: string;
                twitter: string;
                fullName: string;
                email: string;
            };
        };
        created: string;
        updated: string;
        urls: {
            detail: string;
            refresh: string;
            teams: string;
            packages: string;
            addPackage: any;
        };
        id: number;
        account: any;
        resource: {
            githubLegacy: boolean;
            twitterLegacy: boolean;
            github: string;
            twitter: string;
            fullName: string;
            email: string;
        };
    };
    orgs: {
        total: number;
        objects: any[];
    };
    packages: {
        total: number;
        objects: UserPackageDetailsModel[];
        urls: {
            next: string;
            prev: string;
        };
    };
    pagination: {
        perPage: number;
        page: number;
    };
    isAccountLinkEnabledForUser: boolean;
    user: any;
    auditLogEnabled: boolean;
    userEmailVerified: boolean;
    csrftoken: string;
    notifications: string[];
    npmExpansions: string[];
}
