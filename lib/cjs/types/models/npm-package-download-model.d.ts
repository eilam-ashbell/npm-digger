export default class NpmPackageDownloadModel {
    start: string;
    end: string;
    package: string;
}
export declare class NpmPackagePointDownloadsModel extends NpmPackageDownloadModel {
    downloads: number;
}
export declare class NpmPackageRangesDownloadsModel extends NpmPackageDownloadModel {
    downloads: {
        downloads: number;
        day: string;
    }[];
}
export declare class NpmPackageVersionsDownloads {
    package: string;
    downloads: Record<string, number>;
}
