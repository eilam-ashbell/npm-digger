export default class Provenance {
    private baseUrl;
    private packageName;
    private packageVersion;
    private fullData;
    /**
     * @param {string} username The npm username of the required user
     * @returns {User} User class with all functionality
     */
    constructor(packageName: string, packageVersion: string);
    /**
     * @returns {JSON} JSON object consist all provenance data of the specified package version
     */
    data(): Promise<any>;
    subjectAlternativeName(): string | Promise<string>;
    certificateIssuer(): string | Promise<string>;
    issuer(): string | Promise<string>;
    issuerDisplayName(): string | Promise<string>;
    buildTrigger(): string | Promise<string>;
    buildConfigUri(): string | Promise<string>;
    sourceRepositoryUri(): string | Promise<string>;
    sourceRepositoryDigest(): string | Promise<string>;
    sourceRepositoryRef(): string | Promise<string>;
    runInvocationUri(): string | Promise<string>;
    expiresAt(): string | Promise<string>;
    includedAt(): string | Promise<string>;
    resolvedSourceRepositoryCommitUri(): string | Promise<string>;
    transparencyLogUri(): string | Promise<string>;
    buildConfigDisplayName(): string | Promise<string>;
    resolvedBuildConfigUri(): string | Promise<string>;
    sourceCommitResponseCode(): number | Promise<number>;
    sourceCommitUnreachable(): boolean | Promise<boolean>;
    sourceCommitNotFound(): boolean | Promise<boolean>;
}
