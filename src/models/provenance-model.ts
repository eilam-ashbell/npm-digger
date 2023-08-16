export default class ProvenanceModel {
    summary: {
        subjectAlternativeName: string;
        certificateIssuer: string;
        issuer: string;
        issuerDisplayName: string;
        buildTrigger: string;
        buildConfigUri: string;
        sourceRepositoryUri: string;
        sourceRepositoryDigest: string;
        sourceRepositoryRef: string;
        runInvocationUri: string;
        expiresAt: string;
        includedAt: string;
        resolvedSourceRepositoryCommitUri: string;
        transparencyLogUri: string;
        buildConfigDisplayName: string;
        resolvedBuildConfigUri: string;
    };
    sourceCommitResponseCode: number;
    sourceCommitUnreachable: boolean;
    sourceCommitNotFound: boolean;
}
