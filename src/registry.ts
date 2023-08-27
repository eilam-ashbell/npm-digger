import RegistryModel from "./models/registry-model";

export default class Registry {
    private registryData: RegistryModel;
    private baseUrl: string;

    constructor(registryUrl?: string) {
        this.baseUrl = registryUrl || "https://registry.npmjs.org/";
    }

    public async data() {
        try {
            // get data from registry
            const response = await fetch(this.baseUrl, {
                method: "GET",
            });
            // parse data
            const data = await response.json();
            // assign to higher scope variable for reusing
            this.registryData = data;
            // return the data as JSON
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @returns {string} The db name
     */
    public dbName(): string | Promise<string> {
        return this.registryData !== undefined
            ? this.registryData.db_name
            : this.data()
                  .then((res) => {
                      return res.db_name;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {string} The db engine
     */
    public engine(): string | Promise<string> {
        return this.registryData !== undefined
            ? this.registryData.engine
            : this.data()
                  .then((res) => {
                      return res.engine;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {number} The number of docs in the db
     */
    public docCount(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.doc_count
            : this.data()
                  .then((res) => {
                      return res.doc_count;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {number} The number of deleted docs from the db
     */
    public deletedDocCount(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.doc_del_count
            : this.data()
                  .then((res) => {
                      return res.doc_del_count;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {number} An opaque string that describes the state of the database.
     */
    public updateSeq(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.update_seq
            : this.data()
                  .then((res) => {
                      return res.update_seq;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {number} An opaque string that describes the purge state of the database.
     */
    public purgeSeq(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.purge_seq
            : this.data()
                  .then((res) => {
                      return res.purge_seq;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {boolean} Set to 'true' if the database compaction routine is operating on this database
     */
    public compactRunning(): boolean | Promise<boolean> {
        return this.registryData !== undefined
            ? this.registryData.compact_running
            : this.data()
                  .then((res) => {
                      return res.compact_running;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {number} The size of disk, in bytes.
     */
    public diskSize(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.disk_size
            : this.data()
                  .then((res) => {
                      return res.disk_size;
                  })
                  .catch((err) => console.log(err));
    }

    /**
     * @returns {number} The size of data, in bytes.
     */
    public dataSize(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.data_size
            : this.data()
                  .then((res) => {
                      return res.data_size;
                  })
                  .catch((err) => console.log(err));
    }

    public sizes = {
        /**
         * @returns {number} The size of live data inside the database, in bytes.
         */
        active: (): number | Promise<number> => {
            return this.registryData !== undefined
                ? this.registryData.sizes.active
                : this.data()
                      .then((res) => {
                          return res.sizes.active;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {number} The uncompressed size of database contents in bytes.
         */
        external: (): number | Promise<number> => {
            return this.registryData !== undefined
                ? this.registryData.sizes.external
                : this.data()
                      .then((res) => {
                          return res.sizes.external;
                      })
                      .catch((err) => console.log(err));
        },
        /**
         * @returns {number} The size of the database file on disk in bytes.
         */
        file: (): number | Promise<number> => {
            return this.registryData !== undefined
                ? this.registryData.sizes.file
                : this.data()
                      .then((res) => {
                          return res.sizes.file;
                      })
                      .catch((err) => console.log(err));
        },
    };

    /**
     * @returns {number} The version of the physical format used for the data when it is stored on disk.
     */
    public diskFormatVersion(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.disk_format_version
            : this.data()
                  .then((res) => {
                      return res.disk_format_version;
                  })
                  .catch((err) => console.log(err));
    }

    // todo: fill description
    public committedUpdateSeq(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.committed_update_seq
            : this.data()
                  .then((res) => {
                      return res.committed_update_seq;
                  })
                  .catch((err) => console.log(err));
    }

    // todo: fill description
    public compactedSeq(): number | Promise<number> {
        return this.registryData !== undefined
            ? this.registryData.compacted_seq
            : this.data()
                  .then((res) => {
                      return res.compacted_seq;
                  })
                  .catch((err) => console.log(err));
    }

    // todo: fill description
    public uuid(): string | Promise<string> {
        return this.registryData !== undefined
            ? this.registryData.uuid
            : this.data()
                  .then((res) => {
                      return res.uuid;
                  })
                  .catch((err) => console.log(err));
    }
}
