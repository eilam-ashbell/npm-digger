import ProvenanceModel from "./models/provenance-model";

export default class Provenance {
    private baseUrl: string;
    private packageName: string;
    private packageVersion: string;
    private fullData: ProvenanceModel | undefined;

    /**
     * @param {string} username The npm username of the required user
     * @returns {User} User class with all functionality
     */
    constructor(packageName: string, packageVersion?: string) {
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
    public async data() {
        try {
            // get data from npm
            const response = await fetch(this.baseUrl, {
                method: "GET",
            });
            if (response.status !== 200) {
                throw new Error("Cannot get data from npm. Apparently there isn't one for this package");
            } else {
                // parse data
                const data = await response.json();
                // assign to higher scope variable for reusing
                this.fullData = data;
                // return the data as JSON
                return data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    // todo: add descriptions
    public subjectAlternativeName(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.subjectAlternativeName
            : this.data()
                  .then((res) => {
                      return res.summary.subjectAlternativeName;
                  })
                  .catch((err) => console.log(err));
    }

    public certificateIssuer(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.certificateIssuer
            : this.data()
                  .then((res) => {
                      return res.summary.certificateIssuer;
                  })
                  .catch((err) => console.log(err));
    }

    public issuer(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.issuer
            : this.data()
                  .then((res) => {
                      return res.summary.issuer;
                  })
                  .catch((err) => console.log(err));
    }

    public issuerDisplayName(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.issuerDisplayName
            : this.data()
                  .then((res) => {
                      return res.summary.issuerDisplayName;
                  })
                  .catch((err) => console.log(err));
    }

    public buildTrigger(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.buildTrigger
            : this.data()
                  .then((res) => {
                      return res.summary.buildTrigger;
                  })
                  .catch((err) => console.log(err));
    }

    public buildConfigUri(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.buildConfigUri
            : this.data()
                  .then((res) => {
                      return res.summary.buildConfigUri;
                  })
                  .catch((err) => console.log(err));
    }

    public sourceRepositoryUri(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.sourceRepositoryUri
            : this.data()
                  .then((res) => {
                      return res.summary.sourceRepositoryUri;
                  })
                  .catch((err) => console.log(err));
    }

    public sourceRepositoryDigest(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.sourceRepositoryDigest
            : this.data()
                  .then((res) => {
                      return res.summary.sourceRepositoryDigest;
                  })
                  .catch((err) => console.log(err));
    }

    public sourceRepositoryRef(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.sourceRepositoryRef
            : this.data()
                  .then((res) => {
                      return res.summary.sourceRepositoryRef;
                  })
                  .catch((err) => console.log(err));
    }

    public runInvocationUri(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.runInvocationUri
            : this.data()
                  .then((res) => {
                      return res.summary.runInvocationUri;
                  })
                  .catch((err) => console.log(err));
    }

    public expiresAt(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.expiresAt
            : this.data()
                  .then((res) => {
                      return res.summary.expiresAt;
                  })
                  .catch((err) => console.log(err));
    }

    public includedAt(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.includedAt
            : this.data()
                  .then((res) => {
                      return res.summary.includedAt;
                  })
                  .catch((err) => console.log(err));
    }

    public resolvedSourceRepositoryCommitUri(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.resolvedSourceRepositoryCommitUri
            : this.data()
                  .then((res) => {
                      return res.summary.resolvedSourceRepositoryCommitUri;
                  })
                  .catch((err) => console.log(err));
    }

    public transparencyLogUri(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.transparencyLogUri
            : this.data()
                  .then((res) => {
                      return res.summary.transparencyLogUri;
                  })
                  .catch((err) => console.log(err));
    }

    public buildConfigDisplayName(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.buildConfigDisplayName
            : this.data()
                  .then((res) => {
                      return res.summary.buildConfigDisplayName;
                  })
                  .catch((err) => console.log(err));
    }

    public resolvedBuildConfigUri(): string | Promise<string> {
        return this.fullData !== undefined
            ? this.fullData.summary.resolvedBuildConfigUri
            : this.data()
                  .then((res) => {
                      return res.summary.resolvedBuildConfigUri;
                  })
                  .catch((err) => console.log(err));
    }

    public sourceCommitResponseCode(): number | Promise<number> {
        return this.fullData !== undefined
            ? this.fullData.sourceCommitResponseCode
            : this.data()
                  .then((res) => {
                      return res.sourceCommitResponseCode;
                  })
                  .catch((err) => console.log(err));
    }

    public sourceCommitUnreachable(): boolean | Promise<boolean> {
        return this.fullData !== undefined
            ? this.fullData.sourceCommitUnreachable
            : this.data()
                  .then((res) => {
                      return res.sourceCommitUnreachable;
                  })
                  .catch((err) => console.log(err));
    }

    public sourceCommitNotFound(): boolean | Promise<boolean> {
        return this.fullData !== undefined
            ? this.fullData.sourceCommitNotFound
            : this.data()
                  .then((res) => {
                      return res.sourceCommitNotFound;
                  })
                  .catch((err) => console.log(err));
    }
}
