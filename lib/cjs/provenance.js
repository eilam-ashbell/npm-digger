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
Object.defineProperty(exports, "__esModule", { value: true });
class Provenance {
    /**
     * @param {string} username The npm username of the required user
     * @returns {User} User class with all functionality
     */
    constructor(packageName, packageVersion) {
        if (!packageName) {
            throw new Error("Package name is required");
        }
        if (!packageVersion) {
            throw new Error("Package version is required");
        }
        this.packageName = packageName;
        this.packageVersion = packageVersion;
        this.baseUrl = `https://www.npmjs.com/package/${packageName}/v/${packageVersion}/provenance`;
    }
    /**
     * @returns {JSON} JSON object consist all provenance data of the specified package version
     */
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.baseUrl, {
                    method: "GET",
                });
                if (response.status !== 200) {
                    throw new Error("Cannot get data from npm");
                }
                else {
                    // parse data
                    const data = yield response.json();
                    // assign to higher scope variable for reusing
                    this.fullData = data;
                    // return the data as JSON
                    return data;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // todo: add descriptions
    subjectAlternativeName() {
        return this.fullData !== undefined
            ? this.fullData.summary.subjectAlternativeName
            : this.data()
                .then((res) => {
                return res.summary.subjectAlternativeName;
            })
                .catch((err) => console.log(err));
    }
    certificateIssuer() {
        return this.fullData !== undefined
            ? this.fullData.summary.certificateIssuer
            : this.data()
                .then((res) => {
                return res.summary.certificateIssuer;
            })
                .catch((err) => console.log(err));
    }
    issuer() {
        return this.fullData !== undefined
            ? this.fullData.summary.issuer
            : this.data()
                .then((res) => {
                return res.summary.issuer;
            })
                .catch((err) => console.log(err));
    }
    issuerDisplayName() {
        return this.fullData !== undefined
            ? this.fullData.summary.issuerDisplayName
            : this.data()
                .then((res) => {
                return res.summary.issuerDisplayName;
            })
                .catch((err) => console.log(err));
    }
    buildTrigger() {
        return this.fullData !== undefined
            ? this.fullData.summary.buildTrigger
            : this.data()
                .then((res) => {
                return res.summary.buildTrigger;
            })
                .catch((err) => console.log(err));
    }
    buildConfigUri() {
        return this.fullData !== undefined
            ? this.fullData.summary.buildConfigUri
            : this.data()
                .then((res) => {
                return res.summary.buildConfigUri;
            })
                .catch((err) => console.log(err));
    }
    sourceRepositoryUri() {
        return this.fullData !== undefined
            ? this.fullData.summary.sourceRepositoryUri
            : this.data()
                .then((res) => {
                return res.summary.sourceRepositoryUri;
            })
                .catch((err) => console.log(err));
    }
    sourceRepositoryDigest() {
        return this.fullData !== undefined
            ? this.fullData.summary.sourceRepositoryDigest
            : this.data()
                .then((res) => {
                return res.summary.sourceRepositoryDigest;
            })
                .catch((err) => console.log(err));
    }
    sourceRepositoryRef() {
        return this.fullData !== undefined
            ? this.fullData.summary.sourceRepositoryRef
            : this.data()
                .then((res) => {
                return res.summary.sourceRepositoryRef;
            })
                .catch((err) => console.log(err));
    }
    runInvocationUri() {
        return this.fullData !== undefined
            ? this.fullData.summary.runInvocationUri
            : this.data()
                .then((res) => {
                return res.summary.runInvocationUri;
            })
                .catch((err) => console.log(err));
    }
    expiresAt() {
        return this.fullData !== undefined
            ? this.fullData.summary.expiresAt
            : this.data()
                .then((res) => {
                return res.summary.expiresAt;
            })
                .catch((err) => console.log(err));
    }
    includedAt() {
        return this.fullData !== undefined
            ? this.fullData.summary.includedAt
            : this.data()
                .then((res) => {
                return res.summary.includedAt;
            })
                .catch((err) => console.log(err));
    }
    resolvedSourceRepositoryCommitUri() {
        return this.fullData !== undefined
            ? this.fullData.summary.resolvedSourceRepositoryCommitUri
            : this.data()
                .then((res) => {
                return res.summary.resolvedSourceRepositoryCommitUri;
            })
                .catch((err) => console.log(err));
    }
    transparencyLogUri() {
        return this.fullData !== undefined
            ? this.fullData.summary.transparencyLogUri
            : this.data()
                .then((res) => {
                return res.summary.transparencyLogUri;
            })
                .catch((err) => console.log(err));
    }
    buildConfigDisplayName() {
        return this.fullData !== undefined
            ? this.fullData.summary.buildConfigDisplayName
            : this.data()
                .then((res) => {
                return res.summary.buildConfigDisplayName;
            })
                .catch((err) => console.log(err));
    }
    resolvedBuildConfigUri() {
        return this.fullData !== undefined
            ? this.fullData.summary.resolvedBuildConfigUri
            : this.data()
                .then((res) => {
                return res.summary.resolvedBuildConfigUri;
            })
                .catch((err) => console.log(err));
    }
    sourceCommitResponseCode() {
        return this.fullData !== undefined
            ? this.fullData.sourceCommitResponseCode
            : this.data()
                .then((res) => {
                return res.sourceCommitResponseCode;
            })
                .catch((err) => console.log(err));
    }
    sourceCommitUnreachable() {
        return this.fullData !== undefined
            ? this.fullData.sourceCommitUnreachable
            : this.data()
                .then((res) => {
                return res.sourceCommitUnreachable;
            })
                .catch((err) => console.log(err));
    }
    sourceCommitNotFound() {
        return this.fullData !== undefined
            ? this.fullData.sourceCommitNotFound
            : this.data()
                .then((res) => {
                return res.sourceCommitNotFound;
            })
                .catch((err) => console.log(err));
    }
}
exports.default = Provenance;
