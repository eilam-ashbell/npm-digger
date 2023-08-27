import KeyInfoModel from "./models/osv/key-info-model";
import OsvVulnerabilityModel from "./models/osv/vulnerability-model";
export default class Vulnerabilities {
    private baseUrl;
    private packageName;
    private packageVersion;
    private query;
    private fullData;
    constructor(packageName: string, packageVersion?: string);
    /**
     * @returns {JSON} JSON object consist all data from osv.dev website
     */
    data(): Promise<OsvVulnerabilityModel[] | undefined>;
    /**
     * @returns {number} return the number of vulnerabilities for the package
     */
    number(): number | Promise<number | undefined> | undefined;
    /**
     * @returns {string[]} return all vulnerabilities ids for the specified package
     */
    ids(): string[] | Promise<string[] | undefined> | undefined;
    /**
     * @returns {} an object with key info about the vulnerabilities: id, summary, publish date, modified date, affected versions and severity
     */
    keyInfo(): KeyInfoModel[] | Promise<KeyInfoModel[] | undefined> | undefined;
}
