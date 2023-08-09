import DistModel from "./dist-model";
import DistTagsModel from "./dist-tags-model";
import NpmPersonModel from "./npm-person-model";
import PackageVersionsOverviewModel from "./package-versions-overview-model";

export default class NpmPackageVersionDataModel {
    author: NpmPersonModel;
    description: string;
    homepage: string;
    repository: string;
    distTags: DistTagsModel;
    keywords: string[];
    maintainers: NpmPersonModel[];
    name: string;
    license: string;
    version: string;
    versions: PackageVersionsOverviewModel[];
    deprecations: string[];
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}
