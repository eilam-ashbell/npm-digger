export default class Registry {
    private registryData;
    private baseUrl;
    constructor(registryUrl?: string);
    data(): Promise<any>;
    /**
     * @returns {string} The db name
     */
    dbName(): string | Promise<string>;
    /**
     * @returns {string} The db engine
     */
    engine(): string | Promise<string>;
    /**
     * @returns {number} The number of docs in the db
     */
    docCount(): number | Promise<number>;
    /**
     * @returns {number} The number of deleted docs from the db
     */
    deletedDocCount(): number | Promise<number>;
    /**
     * @returns {number} An opaque string that describes the state of the database.
     */
    updateSeq(): number | Promise<number>;
    /**
     * @returns {number} An opaque string that describes the purge state of the database.
     */
    purgeSeq(): number | Promise<number>;
    /**
     * @returns {boolean} Set to 'true' if the database compaction routine is operating on this database
     */
    compactRunning(): boolean | Promise<boolean>;
    /**
     * @returns {number} The size of disk, in bytes.
     */
    diskSize(): number | Promise<number>;
    /**
     * @returns {number} The size of data, in bytes.
     */
    dataSize(): number | Promise<number>;
    sizes: {
        /**
         * @returns {number} The size of live data inside the database, in bytes.
         */
        active: () => number | Promise<number>;
        /**
         * @returns {number} The uncompressed size of database contents in bytes.
         */
        external: () => number | Promise<number>;
        /**
         * @returns {number} The size of the database file on disk in bytes.
         */
        file: () => number | Promise<number>;
    };
    /**
     * @returns {number} The version of the physical format used for the data when it is stored on disk.
     */
    diskFormatVersion(): number | Promise<number>;
    committedUpdateSeq(): number | Promise<number>;
    compactedSeq(): number | Promise<number>;
    uuid(): string | Promise<string>;
}
