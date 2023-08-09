import DistTagsModel from "./dist-tags-model";
import DownloadsModel from "./downloads-model";
import NpmPackageVersionDataModel from "./npm-package-version-data-model";
export default class PackagePageModel {
    canEditPackage: boolean;
    capsule: {
        name: string;
        description: string;
        maintainers: string[];
        "dist-tags": DistTagsModel;
        lastPublish: {
            maintainer: string;
            time: string;
        };
        types: {
            typescript: Record<string, string>;
        };
    };
    dependents: {
        dependentsCount: number;
        dependentsTruncated: string[];
    };
    downloads: DownloadsModel[];
    ghapi: string;
    isStarred: boolean;
    linkingAllowedForPackage: boolean;
    package: string;
    packageLinkingCallToActionHref: string;
    packageUrl: string;
    packageVersion: NpmPackageVersionDataModel;
    packument: NpmPackageVersionDataModel;
    private: boolean;
    isSecurityPlaceholder: boolean;
    provenance: {
        enabled: boolean;
        feedbackUrl: string;
    };
    scope: string;
    starAction: string;
    versionsDownloads: Record<string, number>;
    readme: {
        data: string;
        ref: string;
    };
    undefined: boolean;
    documentContext: Record<string, string>;
    user: any;
    auditLogEnabled: boolean;
    userEmailVerified: boolean;
    csrftoken: string;
    notifications: string[];
    npmExpansions: string[];
}
