import KeyInfoModel from "./models/osv/key-info-model";
import OsvVulnerabilityModel from "./models/osv/vulnerability-model";

export default class Vulnerabilities {
    private baseUrl: string;
    private packageName: string;
    private packageVersion: string | undefined;
    private query: object;
    private fullData: OsvVulnerabilityModel[];

    constructor(packageName: string, packageVersion?: string) {
        if (!packageName) {
            throw new Error("package name is required");
        }

        this.baseUrl = `https://api.osv.dev/v1/query`;
        this.packageName = packageName;
        this.packageVersion = packageVersion || undefined;
        this.query = {
            version: packageVersion || undefined,
            package: {
                name: packageName,
                ecosystem: "npm",
            },
        };
    }

    /**
     * @returns {JSON} JSON object consist all data from osv.dev website
     */
    public async data(): Promise<OsvVulnerabilityModel[] | undefined> {
        try {
            // get data from npm
            const response = await fetch(this.baseUrl, {
                method: "post",
                body: JSON.stringify(this.query),
            });
            // parse data
            const data = await response.json();
            // assign to higher scope variable for reusing
            this.fullData = data.vulns;
            // return the data as JSON
            return this.fullData;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @returns {number} return the number of vulnerabilities for the package
     */
    public number(): number | Promise<number | undefined> | undefined {
        return this.fullData !== undefined
            ? this.fullData.length || 0
            : this.data()
                  .then((res) => {
                      return res?.length || 0;
                  })
                  .catch((err) => {
                      console.log(err);
                      return undefined;
                  });
    }

    /**
     * @returns {string[]} return all vulnerabilities ids for the specified package
     */
    public ids(): string[] | Promise<string[] | undefined> | undefined {
        return this.fullData !== undefined
            ? this.fullData.map((vuln) => vuln.id)
            : this.data()
                  .then((res) => {
                      return res?.map((vuln) => vuln.id);
                  })
                  .catch((err) => {
                      console.log(err);
                      return undefined;
                  });
    }

    /**
     * @returns {} an object with key info about the vulnerabilities: id, summary, publish date, modified date, affected versions and severity
     */
    public keyInfo():
        | KeyInfoModel[]
        | Promise<KeyInfoModel[] | undefined>
        | undefined {
        return this.fullData !== undefined
            ? this.fullData.map((vuln) => {
                  return {
                      id: vuln.id,
                      summary: vuln.summary,
                      published: vuln.published,
                      modified: vuln.modified,
                      affected: vuln.affected.map((a) => {
                          const events = a.ranges.map((r) => r.events).flat(2);
                          return events?.reduce(
                              (result: object, obj: object) => {
                                  return { ...result, ...obj };
                              },
                              {}
                          );
                      }),
                      severity: vuln.severity,
                  };
              })
            : this.data()
                  .then((res) => {
                      return res?.map((vuln) => {
                          return {
                              id: vuln.id,
                              summary: vuln.summary,
                              published: vuln.published,
                              modified: vuln.modified,
                              affected: vuln.affected.map((a) => {
                                  const events = a.ranges
                                      .map((r) => r.events)
                                      .flat(2);
                                  return events?.reduce(
                                      (result: object, obj: object) => {
                                          return { ...result, ...obj };
                                      },
                                      {}
                                  );
                              }),
                              severity: vuln.severity,
                          };
                      });
                  })
                  .catch((err) => {
                      console.log(err);
                      return undefined;
                  });
    }
}
