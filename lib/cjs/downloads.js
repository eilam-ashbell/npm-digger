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
class Downloads {
    constructor(packageName) {
        if (!packageName) {
            throw new Error("Package name is required");
        }
        this.packageName = packageName;
        this.packagePageUrl = `https://www.npmjs.com/package/${packageName}`;
        this.headers = new Headers();
        this.headers.append("x-spiferack", "1");
        this.headers.append("content-type", "application/json");
        this.downloadsBaseUrl = "https://api.npmjs.org/downloads";
        this.perVersionBaseUrl = `https://api.npmjs.org/versions/${packageName}/last-week`;
    }
    /**
     * @returns {DownloadsModel[]} List of the last 52 weeks from today with their download count
     */
    weeklyDownloads() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.packagePageUrl, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = (yield response.json());
                const weeklyDownloads = data.downloads;
                // return the data as JSON
                return weeklyDownloads;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @param {Period | string} period one of Period type options or date string of yyy-mm-dd format
     * @returns {JSON} JSON object consist the total downloads count to a specific date or period
     */
    pointDownload(period) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(`${this.downloadsBaseUrl}/point/${period}/${this.packageName}`, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = yield response.json();
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @param {Period | string} period one of Period type options or date string of yyy-mm-dd:yyy-mm-dd format
     * @returns {JSON} JSON object consist list of downloads count for each day in a range of time
     */
    rangeDownload(period) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(`${this.downloadsBaseUrl}/range/${period}/${this.packageName}`, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = yield response.json();
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @returns {JSON} JSON object consist all downloads count of the last week for each version (key: version, value: downloads count)
     */
    perVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.perVersionBaseUrl, {
                    method: "GET",
                    headers: this.headers,
                });
                // parse data
                const data = yield response.json();
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = Downloads;
