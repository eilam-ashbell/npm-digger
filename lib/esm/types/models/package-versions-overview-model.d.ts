import DistModel from "./dist-model";
export default class PackageVersionOverviewModel {
    version: string;
    date: {
        ts: number;
        rel: string;
    };
    dist: DistModel;
}
