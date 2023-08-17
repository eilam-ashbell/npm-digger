import SearchPackageResultsModel from "./models/search-package-results-model";

export default class Search {
    private baseUrl = `https://registry.npmjs.org/-/v1/search?`;

    /**
     * @param {string} query full-text search to apply

     * @param {string} size how many results should be returned (default 20, max 250)
     * @param {string} from offset to return results from
     * @param {string} quality how much of an effect should quality have on search results (float)
     * @param {string} popularity how much of an effect should popularity have on search results (float)
     * @param {string} maintenance how much of an effect should maintenance have on search results
     * @returns {User} how much of an effect should maintenance have on search results (float)
     */
    public async searchPackage(
        query: string,
        size: number = 20,
        from: number = 0,
        quality?: number,
        popularity?: number,
        maintenance?: number
    ): Promise<SearchPackageResultsModel | undefined> {
        try {
            // get data from npm
            const response = await fetch(
                this.baseUrl +
                    new URLSearchParams({
                        text: query,
                        size: size.toString(),
                        from: from?.toString(),
                        quality: quality?.toString() || "",
                        popularity: popularity?.toString() || "",
                        maintenance: maintenance?.toString() || "",
                    }),
                {
                    method: "GET",
                }
            );
            // parse data
            const data = await response.json();
            // return the data as JSON
            return data as SearchPackageResultsModel;
        } catch (err) {
            console.log(err);
        }
    }
}
