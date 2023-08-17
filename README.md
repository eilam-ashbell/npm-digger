# npm-digger

API wrapper and data extractor on NPM packages without any requirements.

## Table of content

- [npm-digger](#npm-digger)
  - [Table of content](#table-of-content)
  - [Installation](#installation)
  - [Features](#features)
  - [Usage](#usage)
    - [Registry](#registry)
    - [Package](#package)
    - [Version](#version)
    - [Downloads](#downloads)
    - [User](#user)
    - [Search](#search)
    - [Provenance](#provenance)
<!-- * [Contributing](#contributing) -->
<!-- * [License](#license) -->
<!-- * [Author](#author) -->

## Installation

``` bash
npm i npm-digger
```

## Features

- No dependencies
- built-in types system
- Built-in management of caching data so it won't make unnecessary requests every time you ask for data in a same class.
- Parsing data that not expose on the [official npm API documentations](https://github.com/npm/registry/tree/master/docs)

## Usage

npm-digger expose all npm's API data and some more extras from npm's website and internal methods.

The main classes you can use are:

- `Registry` - basic information on the npm registry and DB
- `Package` - information on a specific package
- `Version` - information on a specific version of a package
- `Downloads` - statistics data on downloads of a specific package
- `User` - information on npm's users
- `Search` - results of searching on npm's website
- `Provenance` - new feature [introduced on Apr 23](https://github.blog/2023-04-19-introducing-npm-package-provenance/) and gives you a way to link package to its source repo and specific build instructions used to publish it.

### Registry

By init the `Registry` class, you get access to all registry data npm's API is expose in its [documentations](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md).

``` js
import { Registry } from 'npm-digger'

const registry = new Registry()

const dbName = await registry.dbName()

console.log(dbName)

// console: "registry"
```

Functionality

| Function              | Description                                           | Type          |
| --------------------- | ----------------------------------------------------- | ------------- |
| data()                | JSON response as returns from the npm API | RegistryModel |
| dbName()              | The DB name of the registry | string |
| engine()              | The engine name of the registry DB | string |
| docCount()            | The number of docs in the db | number |
| deletedDocCount()     | The number of deleted docs from the db | number |
| updateSeq()           | An opaque string that describes the state of the database | number |
| purgeSeq()            | An opaque string that describes the purge state of the database | number |
| compactRunning()      | 'True' if the database compaction routine is operating on this database | boolean |
| diskSize()            | The size of disk, in bytes | number |
| dataSize()            | The size of data, in bytes | number |
| sizes.active()        | The size of live data inside the database, in bytes | number |
| sizes.external()      | The uncompressed size of database contents in bytes | number |
| sizes.file()          | The size of the database file on disk in bytes | number |
| diskFormatVersion()   | The version of the physical format used for the data when it is stored on disk | number |
| committedUpdateSeq()  | | number |
| compactedSeq()        | | number |
| uuid()                | | string |

### Package

By init the `Package` class, you get access to all data npm's API is expose in its [documentations](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md) in the package route `https://registry.npmjs.org/:package`. Also, there is some more information that comes from package page on npm website.

This class includes also the `Downloads` class (can be imported separately too)

``` js
import { Package } from 'npm-digger'

const package = new Package('express')

const description = await package.description()

console.log(description)

// console: "Fast, unopinionated, minimalist web framework"
```

Params

| Name | Description | Type | Required |
| ------------- | ----------------------------------------------------- | ------------- | ------------- |
| packageName   | The name of the package you want to get data on. If package is scoped, should be included too | string | yes |

Functionality

| Function              | Description                                           | Type          |
| --------------------- | ----------------------------------------------------- | ------------- |
| name() | Package name (with scope if exist) | string |
| maintainers() | npm username list of maintainers | NpmPersonModel[] |
| distTags() | object includes main tags of the package | {key: name, value: tag} |
| lastPublish.maintainer() | npm username of the maintainer who publish the last release | string |
| lastPublish.time() | date and time of last publish | string |
| types.isBundled() | 'True' if types are bundled in the package | boolean |
| types.isExternal() | 'true if types are in external package | boolean |
| types.entries() | object of entries for locate types for the package | {key: name, value: entry} |
| dependents.count() | total number of dependents packages | number |
| dependents.listAll() | list of all dependents packages with main details | array |
| githubApiRoute() | main route for github API of the package repo | string |
| npmUrl() | URL for package page on npm | string |
| latestVersion.data() | main data objects of the latest version of the package | JSON |
| latestVersion.author()   | author data of the latest version of the package |  |
| latestVersion.description()   | description of the latest version of the package | string |
| latestVersion.homepage()   | homepage of the latest version of the package | string |
| latestVersion.repository()   | link to the repo of the latest version of the package | string |
| latestVersion.keywords() | keywords of the latest version of the package | string[] |
| latestVersion.maintainers() | maintainers of the latest version of the package |  |
| latestVersion.license() |  license of the latest version of the package | string |
| latestVersion.version() | version of the latest version of the package | string |
| latestVersion.dependencies() | dependencies of the latest version of the package | {key: package, value: version} |
| latestVersion.devDependencies() | dev dependencies of the latest version of the package | {key: package, value: version} |
| isPrivate()  | 'true' if package is private | boolean |
| isSecurityPlaceholder() | 'true' if security placeholder was published for this package | boolean |
| readme() | readme file content | string |
| author() | package author data | string |
| description() | package description | string |
| homepage() | homepage of the package | string |
| repository() | package repository url | string |
| keywords() | package keywords | string[] |
| license() | license of the package | string |
| currentVersion() | current version of the package | string |
| versions.data() | JSON object with versions data  | {key: version, value: data about the version} |
| versions.deprecations() | list of deprecated versions | string[] |
| versions.releaseDates() | JSON object with all releases times | {key: release tag, value: date-time string} |
| id() | package name, used as an ID in CouchDB | string |
| rev() | revision number of this version of the document in CouchDB | string |
| createdTime() | time string of package creation | string |
| lastModified() | time string of package last modify time | string |
| stars.count() | number of users who star this package | number |
| stars.usersList() | list of users who star this package | string[] |
| contributors() | list of contributors of this package | array |
| bugsReport() | object with available URLs for bug report | {key: name, value: link} |
| downloads() | [downloads class](#downloads) | Downloads |

### Version

By init the `Version` class, you get access to all version data npm's API is expose in its [documentations](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md).
If no version number provided, the latest version will be used.

This class includes also the `Provenance` class (can be imported separately too)

``` js
import { Version } from 'npm-digger'

const version = new Version('express', '4.18.2')

const name = await version.name()

console.log(name)

// console: "express@4.18.2"
```

Params
| Name | Description | Type | Required |
| ------ | ------ | ------ | ------ |
| packageName | package name | string | yes |
| packageVersion | requested version number | string | no |

Functionality

| Function              | Description                                           | Type          |
| --------------------- | ----------------------------------------------------- | ------------- |
| data() | JSON object consist all data of specified version or latest version of a package | JSON |
| name() | The name of package | string |
| version() | The version of the package | string |
| description() | The description of the package | string |
| author() | author information | PersonModel |
| contributors() | List of contributors of the package | array |
| keywords() | List of keywords of the package | string[] |
| engines() | the node engines required for this version to run, if specified | {key: engine, value: version} |
| scripts() | all scripts defined on the package jason file of the package | {key: name, value: script} |
| id() | Id of the package on npm (A.K.A packageName@PackageVersion) | string |
| nodeVersion() | the version of node used to publish this version | string |
| npmVersion() | the version of the npm client used to publish this | string |
| dist() | Dist object with information about this version distribution | DistModel |
| tarball() | url of tarball file | string |
| directories() | directories included by this version |  |
| main() | the package's entry point (e.g., index.js or main.js) | string |
| license() | the SPDX identifier of the package's license | string |
| repository() | url for repository as given in package.json |  |
| bugs() | url for bugs reporting | string |
| homepage() | url of the homepage of the package | string |
| bin() | a mapping of bin commands to set up for this version |  |
| dependencies() | a mapping of other packages this version depends on to the required semver ranges |  |
| peerDependencies() | a mapping of package names to the required semver ranges of peer dependencies |  |
| devDependencies() | a mapping of package names to the required semver ranges of development dependencies |  |
| optionalDependencies() | an object mapping package names to the required semver ranges of optional dependencies |  |
| resolutions() |  |  |
| gitHead() | git head signature of the version | string |
| maintainers() | list of the npm usernames of the people with permission to write to that package |  |
| npmUser() | the account that did the publishing for that version |  |
| hasShrinkwrap() | true if this version is known to have a shrinkwrap that must be used to install it; false if this version is known not | boolean |

### Downloads

By init the `Downloads` class, you get access to analytics data about the package downloads.

``` js
import { Downloads } from 'npm-digger'

const downloads = new Downloads('express')

const pointDownload = await downloads.pointDownload('last-week')

console.log(pointDownload)

// console: 
//      {
//          "downloads": 26951829,
//          "start": "2023-08-10",
//          "end": "2023-08-16",
//          "package": "express"
//      }
```

Params
| Name | Description | Type | Required |
| ------ | ------ | ------ | ------ |
| packageName | package name | string | yes |

Functionality

| Function              | Description                                           | Type          | params          |
| --------------------- | ----------------------------------------------------- | ------------- | ------------- |
| weeklyDownloads()| List of the last 52 weeks from today with their download count | JSON | |
| pointDownload()| JSON object consist the total downloads count to a specific date or period | JSON | period - one of Period type options or date string of yyy-mm-dd:yyy-mm-dd format |
| rangeDownload()| JSON object consist list of downloads count for each day in a range of time | JSON | period - one of Period type options or date string of yyy-mm-dd:yyy-mm-dd format |
| perVersion()| JSON object consist all downloads count of the last week for each version | {key: version, value: downloads count}|  |

### User

By init the `User` class, you get access to all available data exist on npm user page

``` js
import { User } from 'npm-digger'

const user = new User('username')

const accountType = await user.accountType()

console.log(accountType)

// console: "user"
```

Params
| Name | Description | Type | Required |
| ------ | ------ | ------ | ------ |
| username | name of required user data | string | yes |

Functionality

| Function              | Description                                           | Type          |
| --------------------- | ----------------------------------------------------- | ------------- |
| rawData()| JSON object consist all data from npm user page | JSON |
| accountType()| The user type definition by npm | string |
| name()| The user name on npm | string |
| description()| The user description paragraph on npm | string |
| avatars()| An object with links all the existing avatar images sizes | object |
| avatar.small()| Link to small avatar image | string |
| avatar.medium()| Link to medium avatar image | string |
| avatar.large()| Link to large avatar image | string |
| createdDate()| Account creation date | string |
| updatedDate()| Last date of updating the account | string |
| id()| User id on npm | number |
| info.isGithubAccountConnected()| 'true' if the user associate github account to his npm profile | boolean |
| info.isTwitterAccountConnected()| 'true' if the user associate twitter account to his npm profile | boolean |
| info.githubAccount()| associated github username | string |
| info.twitterAccount()| associated twitter username | string |
| info.fullName()| The full name provided by the user | string |
| info.email()| The email provided by the user | string |
| packages.totalNumber()| Number of all packages owned by the user | number |
| packages.listAll()| Array of all the packages owned by the user with their main info | array |
| orgs.totalNumber()| Number of all organizations the user is associated with | number |
| orgs.listAll()| Array of all the organizations the user is associated with, with their main info | array |

### Search

By init the `Search` class, you get access npm search engine for package searching as define in the [npm documentations](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search).

``` js
import { Search } from 'npm-digger'

const search = new Search()

const res = await search.searchPackage('express', 5)

```

Functionality

| Function              | Description                                           | Type          |
| --------------------- | ----------------------------------------------------- | ------------- |
| searchPackage()| JSON object consist search results on npm website search engine  | JSON |

Params
| Name | Description | Type | Required |
| ------ | ------ | ------ | ------ |
| query | full text search to apply | string | yes |
| size | how many results should be returned | number | no |
| from | offset to return results from | number | no |
| quality | how much of an effect should quality have on search results | number | no |
| popularity | how much of an effect should popularity have on search results | number | no |
| maintenance | how much of an effect should maintenance have on search results | number | no |

Provenance

### Provenance

By init the `Provenance` class, you get access npm & github provenance data.

``` js
import { Provenance } from 'npm-digger'

const provenance = new Provenance()

const res = await provenance.searchPackage('express', 5)

```

Params
| Name | Description | Type | Required |
| ------ | ------ | ------ | ------ |
| packageName | package name | string | yes |
| packageVersion | requested version number | string | yes |

Functionality

| Function              | Description                                           | Type          |
| --------------------- | ----------------------------------------------------- | ------------- |
| data()| JSON object consist all provenance data of the specified package version | JSON |
| subjectAlternativeName()|  | string |
| certificateIssuer()|  | string |
| issuer()|  | string |
| issuerDisplayName()|  | string |
| buildTrigger()|  | string |
| buildConfigUri()|  | string |
| sourceRepositoryUri()|  | string |
| sourceRepositoryDigest()|  | string |
| sourceRepositoryRef()|  | string |
| runInvocationUri()|  | string |
| expiresAt()|  | string |
| includedAt()|  | string |
| resolvedSourceRepositoryCommitUri()|  | string |
| transparencyLogUri()|  | string |
| buildConfigDisplayName()|  | string |
| resolvedBuildConfigUri()|  | string |
| sourceCommitResponseCode()|  | number |
| sourceCommitUnreachable()|  | boolean |
| sourceCommitNotFound()|  | boolean |
