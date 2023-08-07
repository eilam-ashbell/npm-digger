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
class Registry {
    constructor(registryUrl) {
        this.sizes = {
            /**
             * @returns {number} The size of live data inside the database, in bytes.
             */
            active: () => {
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
            external: () => {
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
            file: () => {
                return this.registryData !== undefined
                    ? this.registryData.sizes.file
                    : this.data()
                        .then((res) => {
                        return res.sizes.file;
                    })
                        .catch((err) => console.log(err));
            },
        };
        this.baseUrl = registryUrl || "https://registry.npmjs.org/";
    }
    data() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get data from registry
                const response = yield fetch(this.baseUrl, {
                    method: "GET",
                });
                // parse data
                const data = yield response.json();
                // assign to higher scope variable for reusing
                this.registryData = data;
                // return the data as JSON
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /**
     * @returns {string} The db name
     */
    dbName() {
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
    engine() {
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
    docCount() {
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
    deletedDocCount() {
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
    updateSeq() {
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
    purgeSeq() {
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
    compactRunning() {
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
    diskSize() {
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
    dataSize() {
        return this.registryData !== undefined
            ? this.registryData.data_size
            : this.data()
                .then((res) => {
                return res.data_size;
            })
                .catch((err) => console.log(err));
    }
    /**
     * @returns {number} The version of the physical format used for the data when it is stored on disk.
     */
    diskFormatVersion() {
        return this.registryData !== undefined
            ? this.registryData.disk_format_version
            : this.data()
                .then((res) => {
                return res.disk_format_version;
            })
                .catch((err) => console.log(err));
    }
    // todo: fill description
    committedUpdateSeq() {
        return this.registryData !== undefined
            ? this.registryData.committed_update_seq
            : this.data()
                .then((res) => {
                return res.committed_update_seq;
            })
                .catch((err) => console.log(err));
    }
    // todo: fill description
    compactedSeq() {
        return this.registryData !== undefined
            ? this.registryData.compacted_seq
            : this.data()
                .then((res) => {
                return res.compacted_seq;
            })
                .catch((err) => console.log(err));
    }
    // todo: fill description
    uuid() {
        return this.registryData !== undefined
            ? this.registryData.uuid
            : this.data()
                .then((res) => {
                return res.uuid;
            })
                .catch((err) => console.log(err));
    }
}
exports.default = Registry;
