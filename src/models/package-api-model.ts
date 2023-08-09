import DistTagsModel from "./dist-tags-model";
import NpmOverviewVersionModel from "./npm-overview-version-model";
import NpmPersonModel from "./npm-person-model";
import { FullPackageTimeModel } from "./package-time-model";

export default class PackageApiModel {
    _id: string;
    _rev: string;
    name: string;
    description: string;
    "dist-tags": DistTagsModel;
    versions: Record<string, NpmOverviewVersionModel>;
    readme: string;
    maintainers: NpmPersonModel[];
    time: FullPackageTimeModel;
    author: NpmPersonModel;
    repository: Record<string, string>;
    users: Record<string, boolean>;
    readmeFilename: string;
    homepage: string;
    keywords: string[];
    contributors: NpmPersonModel[];
    bugs: Record<string, string>;
    license: string;
}
