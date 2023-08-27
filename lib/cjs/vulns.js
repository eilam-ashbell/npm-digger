"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Vulnerabilities {
    constructor(packageName, packageVersion) {
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
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.baseUrl, {
                    method: "post",
                    body: JSON.stringify(this.query),
                });
                // parse data
                const data = yield response.json();
                // assign to higher scope variable for reusing
                this.fullData = data.vulns;
                // return the data as JSON
                return this.fullData;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @returns {number} return the number of vulnerabilities for the package
     */
    number() {
        return this.fullData !== undefined
            ? this.fullData.length || 0
            : this.data()
                .then((res) => {
                return (res === null || res === void 0 ? void 0 : res.length) || 0;
            })
                .catch((err) => {
                console.log(err);
                return undefined;
            });
    }
    /**
     * @returns {string[]} return all vulnerabilities ids for the specified package
     */
    ids() {
        return this.fullData !== undefined
            ? this.fullData.map((vuln) => vuln.id)
            : this.data()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.map((vuln) => vuln.id);
            })
                .catch((err) => {
                console.log(err);
                return undefined;
            });
    }
    /**
     * @returns {} an object with key info about the vulnerabilities: id, summary, publish date, modified date, affected versions and severity
     */
    keyInfo() {
        return this.fullData !== undefined
            ? this.fullData.map((vuln) => {
                return {
                    id: vuln.id,
                    summary: vuln.summary,
                    published: vuln.published,
                    modified: vuln.modified,
                    affected: vuln.affected.map((a) => {
                        const events = a.ranges.map((r) => r.events).flat(2);
                        return events === null || events === void 0 ? void 0 : events.reduce((result, obj) => {
                            return Object.assign(Object.assign({}, result), obj);
                        }, {});
                    }),
                    severity: vuln.severity,
                };
            })
            : this.data()
                .then((res) => {
                return res === null || res === void 0 ? void 0 : res.map((vuln) => {
                    return {
                        id: vuln.id,
                        summary: vuln.summary,
                        published: vuln.published,
                        modified: vuln.modified,
                        affected: vuln.affected.map((a) => {
                            const events = a.ranges
                                .map((r) => r.events)
                                .flat(2);
                            return events === null || events === void 0 ? void 0 : events.reduce((result, obj) => {
                                return Object.assign(Object.assign({}, result), obj);
                            }, {});
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
exports.default = Vulnerabilities;
