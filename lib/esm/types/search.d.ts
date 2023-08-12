import SearchPackageResultsModel from "./models/search-package-results-model";
export default class Search {
    private baseUrl;
    /**
     * @param {string} query full-text search to apply

     * @param {string} size how many results should be returned (default 20, max 250)
     * @param {string} from offset to return results from
     * @param {string} quality how much of an effect should quality have on search results (float)
     * @param {string} popularity how much of an effect should popularity have on search results (float)
     * @param {string} maintenance The npm username of the required user
     * @returns {User} how much of an effect should maintenance have on search results (float)
     */
    searchPackage(query: string, size?: number, from?: number, quality?: number, popularity?: number, maintenance?: number): Promise<SearchPackageResultsModel | undefined>;
}
