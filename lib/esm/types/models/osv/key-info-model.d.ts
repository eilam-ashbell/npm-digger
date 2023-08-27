export default class KeyInfoModel {
    id: string;
    summary: string;
    published: string;
    modified: string;
    affected: Record<string, string>[];
    severity: {
        type: string;
        score: string;
    }[];
}
