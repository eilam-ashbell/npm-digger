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
class Search {
    constructor() {
        this.baseUrl = `https://registry.npmjs.org/-/v1/search?`;
    }
    /**
     * @param {string} query full-text search to apply

     * @param {string} size how many results should be returned (default 20, max 250)
     * @param {string} from offset to return results from
     * @param {string} quality how much of an effect should quality have on search results (float)
     * @param {string} popularity how much of an effect should popularity have on search results (float)
     * @param {string} maintenance The npm username of the required user
     * @returns {User} how much of an effect should maintenance have on search results (float)
     */
    searchPackage(query, size = 20, from = 0, quality, popularity, maintenance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from npm
                const response = yield fetch(this.baseUrl +
                    new URLSearchParams({
                        text: query,
                        size: size.toString(),
                        from: from === null || from === void 0 ? void 0 : from.toString(),
                        quality: (quality === null || quality === void 0 ? void 0 : quality.toString()) || "",
                        popularity: (popularity === null || popularity === void 0 ? void 0 : popularity.toString()) || "",
                        maintenance: (maintenance === null || maintenance === void 0 ? void 0 : maintenance.toString()) || "",
                    }), {
                    method: "GET",
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
exports.default = Search;
