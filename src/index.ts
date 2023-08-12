import Downloads from "./downloads.js";
import Package from "./package.js";
import Registry from "./registry.js";
import User from "./user.js";
import Search from "./search.js";
import Version from "./version.js";

export default class NPM {
    user: User
    registry: Registry
    downloads: Downloads
    package: Package
    search: Search
    version: Version
}

export { User, Registry, Downloads, Package, Search, Version };