export default class UserPackageDetailsModel {
    id: number;
    name: string;
    private: boolean;
    publish_requires_tfa: boolean;
    settings: any; //todo: find type
    created: {
        ts: number;
        rel: string;
    };
    updated: {
        ts: number;
        rel: string;
    };
    is_high_impact: boolean;
    description: string;
    maintainers: string[];
    'dist-tags': {
        latest: string;
    };
    lastPublish: {
        maintainer: string;
        time: string;
        formattedTime: string;
    };
    types: { typescript: Record<string, string> };
    publisher: {
        name: string;
        avatars: {
            small: string;
            medium: string;
            large: string;
        };
    };
    date: {
        ts: number;
        rel: string;
    };
    version: string;
}