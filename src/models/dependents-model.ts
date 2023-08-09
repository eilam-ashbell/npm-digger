import UserPackageDetailsModel from "./user-package-details-model"


export default class DependentsModel {
    "title": string
    "dependency": string
    "packages": UserPackageDetailsModel[]
    "hasNext": boolean
    "hasPrev": boolean
    "paginationSize": number
    "url": string
    "user": any
    "auditLogEnabled": boolean
    "userEmailVerified": any
    "csrftoken": string
    "notifications": string[]
    "npmExpansions": string[]
}