import NpmOverviewVersionModel from './npm-overview-version-model';
import NpmPersonModel from "./npm-person-model";
import RepoModel from './repo-model';
export default class NpmFullVersionModel extends NpmOverviewVersionModel {
    main: string;
    license: string;
    repository: RepoModel;
    bugs: {
        url: string;
    };
    homepage: string;
    types: string;
    bin: Record<string, string>;
    dependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    optionalDependencies: Record<string, string>;
    resolutions: Record<string, string>;
    gitHead: string;
    maintainers: NpmPersonModel[];
    _npmUser: NpmPersonModel;
    _npmOperationalInternal?: {
        host: string;
        tmp: string;
    };
    _hasShrinkwrap: boolean;
    _shasum: string;
    _from: string;
}
